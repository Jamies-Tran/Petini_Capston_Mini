import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { MessageComponent } from '../pop-up/message/message.component';
import { SuccessComponent } from '../pop-up/success/success.component';
import { MatDialog } from '@angular/material/dialog';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  message: any;
  values: any[] = [];
  datas: any;
  service: any[] = [];
  time: any[] = [];

  ngOnInit(): void {
    this.http.getCustomerBookingList().subscribe(
      async (data) => {
        this.datas = data;

        for (let value of this.datas) {
          if (value.bookingSchedules.length > 0) {
            this.service = [];
            this.time = [];
            let name = ''; // 2
            let createdDate = value.createdDate as string;
            let date = '';
            date = createdDate.slice(0, 10); // 1
            let status = value.status; // 1
            let imageUrl = ''; // 2
            let description = ''; // 2
            let timeLabel = []; // 3
            let totalPrice = value.totalPrice; // 1
            let bookingAfterCare = value.bookingAfterCare; // 2
            let bookingSchedules = value.bookingSchedules;
            let price; // 2

            for (let service of bookingAfterCare) {
              name = service.petiniAfterCare.name;
              price = service.price;
              description = service.petiniAfterCare.description;
              imageUrl = service.petiniAfterCare.imageUrl;
              await this.image
                .getImage('services/' + imageUrl)
                .then((url) => {
                  imageUrl = url;
                })
                .catch((error) => {});
              this.service.push({
                name: name,
                price: price,
                description: description,
                imageUrl: imageUrl,
              });
              console.log(this.service);
            }
            for (let time of bookingSchedules) {
              this.time.push({ timeLabel: time.timeLabel });
              console.log(this.time);
            }

            this.values.push({
              date: date,
              status: status,
              totalPrice: totalPrice,
              service: this.service,
              time: this.time,
            });
            console.log(this.values);
          }
        }
      },
      (error) => {
        this.message = 'Bạn chưa có lịch đặt nào cả';
        this.openDialogMessage;
      }
    );
  }
  constructor(
    private http: BookingService,
    public dialog: MatDialog,
    private image: ImageService
  ) {}
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
