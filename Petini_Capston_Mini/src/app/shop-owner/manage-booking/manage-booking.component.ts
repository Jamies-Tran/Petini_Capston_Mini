import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from 'src/app/pop-up/message/message.component';
import { SuccessComponent } from 'src/app/pop-up/success/success.component';
import { BookingService } from 'src/app/services/booking.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss'],
})
export class ManageBookingComponent implements OnInit {
  valuesAll: any;
  valuesPending: any;
  valuesFinished: any;
  i: any;
  message!: string;
  datas: any;

  constructor(
    public dialog: MatDialog,
    private image: ImageService,
    private http: BookingService
  ) {}
  ngOnInit(): void {

    // All
    this.valuesAll = [];
    this.datas = [];
    this.http.getAllBooking().subscribe(async (data) => {
      console.log(data);
      this.datas = data;
      for (let value of this.datas) {
        if (value.bookingSchedules.length > 0) {
          this.valuesAll.push(value);
        }
      }
    });

    // All
    this.valuesPending = [];
    this.datas = [];
    this.http.getBookingListByStatus('PENDING').subscribe(async (data) => {
      console.log(data);
      this.datas = data;
      for (let value of this.datas) {
        if (value.bookingSchedules.length > 0) {
          this.valuesPending.push(value);
        }
      }
    });

    // All
    this.valuesFinished = [];
    this.datas = [];
    this.http.getBookingListByStatus('FINISHED').subscribe(async (data) => {
      console.log(data);
      this.datas = data;
      for (let value of this.datas) {
        if (value.bookingSchedules.length > 0) {
          this.valuesFinished.push(value);
        }
      }
    });
  }

  // All
  pageAll: number = 1;
  countAll: number = 0;
  tableSizeAll: number = 5;

  onTableDataChangeAll(event: any) {
    this.pageAll = event;
    this.valuesAll;
  }

  // Pending
  pagePending: number = 1;
  countPending: number = 0;
  tableSizePending: number = 5;

  onTableDataChangePending(event: any) {
    this.pagePending = event;
    this.valuesPending;
  }

  // Finished
  pageFinished: number = 1;
  countFinished: number = 0;
  tableSizeFinished: number = 5;

  onTableDataChangeFinished(event: any) {
    this.pageFinished = event;
    this.valuesFinished;
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
