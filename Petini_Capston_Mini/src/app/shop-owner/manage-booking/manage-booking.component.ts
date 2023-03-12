import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from 'src/app/pop-up/message/message.component';
import { SuccessComponent } from 'src/app/pop-up/success/success.component';
import { BookingService } from 'src/app/services/booking.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {
  values:any
  i: any;
  message!: string;
  status = 'sellin';
  datas:any;

  constructor(
    public dialog: MatDialog,
    private image: ImageService,
    private http: BookingService
  ) {}
  ngOnInit(): void {
    this.values = [];
    this.datas = [];
    this.http.getAllBooking().subscribe(async (data) => {
      console.log(data);
      this.datas = data
      for(let value of this.datas){
        if(value.bookingSchedules.length >0){
          this.values.push(value);
        }
      }

    });
  }

  title = 'pagination';
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;

  // Customer
  onTableDataChangeCustomer(event: any) {
    this.page = event;
    this.values;
  }

  public onItemSelector(id: number) {
    localStorage.setItem('getBookingId', id + '');
  }

  openDialogMessage() {
    this.dialog.open(MessageComponent, {
      data: this.message,
    });
  }
  openDialogSuccess() {
    this.dialog.open(SuccessComponent, {
      data: this.message,
    });
  }

}
