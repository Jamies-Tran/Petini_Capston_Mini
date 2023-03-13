import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { MatDialog } from '@angular/material/dialog';
import { AfterCareService } from '../services/after-care.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SuccessComponent } from '../pop-up/success/success.component';
import { MessageComponent } from '../pop-up/message/message.component';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss'],
})
export class ServiceDetailComponent implements OnInit {
  selectedDate!: string;
  date: Date[] = [];
  time: Time[] = [];
  distanceTime = 30;
  curentDate: any;

  get3Day() {
    // day1
    const day1 = new Date();
    let valueDay1 = '';
    let viewValueDay1 = '';
    var date = new Date(day1),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    valueDay1 = [date.getFullYear(), mnth, day].join('-');
    viewValueDay1 = 'Hôm nay, ' + [day, mnth, date.getFullYear()].join('-');
    this.curentDate = 'Hôm nay, ' + [day, mnth, date.getFullYear()].join('-');

    // day2
    // const day2 = new Date();
    // let valueDay2 = '';
    // let viewValueDay2 = '';
    // day2.setDate(day2.getDate() + 1);
    // var date = new Date(day2),
    //   mnth = ('0' + (date.getMonth() + 1)).slice(-2),
    //   day = ('0' + date.getDate()).slice(-2);
    // valueDay2 = [date.getFullYear(), mnth, day].join('-');
    // viewValueDay2 = 'Ngày mai, ' + [day, mnth, date.getFullYear()].join('-');

    // day3
    // const day3 = new Date();
    // let valueDay3 = '';
    // let viewValueDay3 = '';
    // day3.setDate(day3.getDate() + 2);
    // var date = new Date(day3),
    //   mnth = ('0' + (date.getMonth() + 1)).slice(-2),
    //   day = ('0' + date.getDate()).slice(-2);
    // valueDay3 = [date.getFullYear(), mnth, day].join('-');
    // viewValueDay3 = 'Ngày mốt, ' + [day, mnth, date.getFullYear()].join('-');

    // console.log('hom nay 11-03-2023:    ', valueDay1);
    // console.log('ngay mai 12-03-2023:   ', valueDay2);
    // console.log('ngay mot 13-03-2023    ', valueDay3);

    this.date.push({ value: valueDay1, viewValue: viewValueDay1 });
  }

  message = '';
  name = '';
  description = '';
  status = '';
  imageUrl = '';
  waste = 0;
  price = '';
  value: any;
  messageTimeBox: any;
  isLogin = false;

  ngOnInit(): void {
    this.get3Day();
    try {
      const name = localStorage.getItem('getServiceName') as string;
      console.log(name);
      this.httpService.getServiceDetail(name).subscribe(
        async (data) => {
          console.log(data);
          this.value = data;
          this.name = this.value.name;
          this.description = this.value.description;
          this.status = this.value.status;
          this.price = this.value.price;
          this.imageUrl = this.value.imageUrl;
          let boxTime = this.value.afterCareWorkingSchedules;
          this.messageTimeBox = '';
          this.isLogin = false;
          if (localStorage.getItem('userToken')) {
            this.isLogin = true;
            for (let item of this.value.afterCareWorkingSchedules) {
              let statusTime = false;
              this.httpBooking.checkValidBooking(item.timeLabel).subscribe(
                (data) => {
                  if (data) {
                    statusTime = true;
                  } else statusTime = false;
                  this.time.push({
                    timeLabel: item.timeLabel,
                    timeValue: item.timeValue,
                    statusTime: statusTime,
                    statusBooking: false,
                  });
                },
                (error) => {
                  this.message = error;
                  console.log(this.message);
                }
              );
            }
          } else {
            this.messageTimeBox = 'Mời bạn đăng nhập ';
            this.isLogin = false;
          }
          console.log(this.time);

          // get file image
          await this.image
            .getImage('services/' + this.imageUrl)
            .then((url) => {
              this.imageUrl = url;
            })
            .catch((error) => {});
          console.log(this.imageUrl);
        },
        (error) => {
          this.message = error.message;
          this.openDialogMessage();
        }
      );
    } catch (error) {}
    this.selectedDate = this.date[0].value;
  }
  openDialogMessage() {
    this.dialog.open(MessageComponent, {
      data: this.message,
    });
  }
  openDialogSuccess() {
    localStorage.setItem('registerSuccess', '');

    const timeout = 3000;
    const dialogRef = this.dialog.open(SuccessComponent, {
      data: this.message,
    });
    dialogRef.afterOpened().subscribe((_) => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout);
    });
  }

  constructor(
    private image: ImageService,
    public dialog: MatDialog,
    private httpService: AfterCareService,
    private router: Router,
    private route: ActivatedRoute,
    private httpBooking: BookingService
  ) {}

  createServiceBooking: Array<{ serviceName: string; timeLabel: Array<any> }> =
    [];
  timeLabelBooking: any = [];
  bookingService() {
    this.timeLabelBooking = [];
    for (let item of this.time) {
      if (item.statusBooking == true) {
        let timeLabel = '';
        timeLabel = item.timeLabel;
        this.timeLabelBooking.push(timeLabel);
      }
    }
    console.log(this.timeLabelBooking);
    // let timeLabel=[]
    // timeLabel.push("12:00","13:00");
    this.createServiceBooking.push({
      serviceName: this.name,
      timeLabel: this.timeLabelBooking,
    });
    if (localStorage.getItem('userToken')) {
      this.httpBooking
        .createServiceBooking(this.name, this.timeLabelBooking)
        .subscribe(
          (data) => {
            this.message = 'Đăng ký lịch thành công';
            this.openDialogSuccess();
            setTimeout(function () {
              window.location.reload();
            }, 2000);
          },
          (error) => {
            this.message = error;
            this.openDialogMessage();
          }
        );
    } else {
      this.message = 'Mời bạn đăng nhập ';
      this.openDialogMessage();
    }
  }
}

interface Date {
  value: string;
  viewValue: string;
}
interface Time {
  timeLabel: string;
  timeValue: string;
  statusTime: boolean;
  statusBooking: boolean;
}
