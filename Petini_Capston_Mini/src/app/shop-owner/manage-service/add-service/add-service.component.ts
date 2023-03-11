import { Component } from '@angular/core';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss'],
})
export class AddServiceComponent {
  name: any;
  price: any;
  description: any;
  file!: File;
  files: File[] = [];
  showReview = false;
  onRemove(event: File) {
    // console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.showReview = false;
    // this.imageUrl = '';
    // console.log(this.imageUrl);
    // console.log('files lenght: ', this.files.length);
    // if (this.files.length >= 1) {
    //   this.showDiv = false;
    // } else {
    //   this.showDiv = true;
    // }
  }

  onSelect(files: any) {
    this.files.push(...files.addedFiles);
    for (this.file of this.files) {
      this.showReview = true;
    }

    // console.log(event);
    // this.files.push(...files.addedFiles);

    // for (this.file of this.files) {
    //   this.items[i].imageUrl = this.file.name;
    //   this.items[i].file = this.file;
    // }
    // console.log(this.imageUrl);
    // if (this.files.length >= 1) {
    //   this.showDiv = false;
    // }
  }

  // 10:00:00 string
  wastes: Waste[] = [
    {
      value: 10,
      viewValue: '10 phút',
    },
    {
      value: 20,
      viewValue: '20 phút',
    },
    {
      value: 30,
      viewValue: '30 phút',
    },
    {
      value: 40,
      viewValue: '40 phút',
    },
    {
      value: 50,
      viewValue: '50 phút',
    },
    {
      value: 60,
      viewValue: '60 phút',
    },
  ];
  time: Time[] = [];

  workTime = 12;
  minute = 60;
  workMinute = 720; // 720
  timeValue: any;
  startTimeHour = 8;
  startTimeMinute = 0;
  endTime = 20;
  waste!: number;

  getTimeBox() {
    this.time = [];
    this.startTimeHour = 8;
    this.startTimeMinute = 0;
    console.log(this.waste);
    console.log(this.workMinute / this.waste);
    this.time.push({
      timeValue: '0' + this.startTimeHour.toString() + ':00:00',
      timeLabel: '0' + this.startTimeHour.toString() + ':00',
    });

    for (let i = 0; i <= this.workMinute / this.waste; i++) {
      this.startTimeMinute = this.startTimeMinute + this.waste;
      if (this.startTimeHour == 19 && (this.startTimeMinute + this.waste) > 60 ||
        this.startTimeHour == 20 && this.startTimeMinute == 0) {
        return;
      }
      // dk ( khoảng thời gian + time box Phút ) < 60 phút
      if (this.startTimeMinute < this.minute) {
        // thay doi phut // phut nho hon < 60 => 50 40 30
        if (this.startTimeHour < 10) {
          // gio nho hon < 10 = 7 8 9
          let timeValueHour = '0' + this.startTimeHour.toString(); // 08 09
          let timeValueMinute = this.startTimeMinute.toString(); // 10 20 30
          let timeBoxValue = timeValueHour + ':' + timeValueMinute;
          console.log('time box value: ', timeBoxValue + ':00');
          this.time.push({
            timeValue: timeBoxValue + ':00',
            timeLabel: timeBoxValue,
          });
        } else {
          // gio =  10 11 12
          let timeValueHour = this.startTimeHour.toString(); // 10 11 12
          let timeValueMinute = this.startTimeMinute.toString(); // 30 40 50
          let timeBoxValue = timeValueHour + ':' + timeValueMinute;
          console.log('time box value: ', timeBoxValue + ':00');
          this.time.push({
            timeValue: timeBoxValue + ':00',
            timeLabel: timeBoxValue,
          });
        }
      } else if (this.startTimeMinute == this.minute) {
        // 60 = 60 => 00
        if (this.startTimeHour < 9) {
          // 8 7 6
          this.startTimeHour = this.startTimeHour + 1;
          let timeValueHour = '0' + this.startTimeHour.toString(); // 08
          let timeValueMinute = '00';
          this.startTimeMinute = 0; // reset phut khi = 60
          let timeBoxValue = timeValueHour + ':' + timeValueMinute;
          console.log('time box value: ', timeBoxValue + ':00');
          this.time.push({
            timeValue: timeBoxValue + ':00',
            timeLabel: timeBoxValue,
          });
        } else {
          // 9 10 11
          this.startTimeHour = this.startTimeHour + 1;
          let timeValueHour = this.startTimeHour.toString();
          let timeValueMinute = '00';
          this.startTimeMinute = 0;
          let timeBoxValue = timeValueHour + ':' + timeValueMinute;
          console.log('time box value: ', timeBoxValue + ':00');
          this.time.push({
            timeValue: timeBoxValue + ':00',
            timeLabel: timeBoxValue,
          });
        }
      } else if (this.startTimeMinute > this.minute) {
        // 70 80 90
        if (this.startTimeHour < 9) {
          this.startTimeHour = this.startTimeHour + 1;
          let timeValueHour = '0' + this.startTimeHour.toString(); // 7+1 = 8 // 8 + 1 =9
          this.startTimeMinute = this.startTimeMinute - this.minute; //10 20 30
          let timeValueMinute = this.startTimeMinute.toString();
          let timeBoxValue = timeValueHour + ':' + timeValueMinute;
          console.log('time box value: ', timeBoxValue + ':00');
          this.time.push({
            timeValue: timeBoxValue + ':00',
            timeLabel: timeBoxValue,
          });
        } else {
          // 9 10 11
          this.startTimeHour = this.startTimeHour + 1;
          let timeValueHour = this.startTimeHour.toString();
          this.startTimeMinute = this.startTimeMinute - this.minute;
          let timeValueMinute = this.startTimeMinute.toString();
          let timeBoxValue = timeValueHour + ':' + timeValueMinute;
          console.log('time box value: ', timeBoxValue + ':00');
          this.time.push({
            timeValue: timeBoxValue + ':00',
            timeLabel: timeBoxValue,
          });



        }




      }
    }
  }
}
export interface Time {
  timeValue: string;
  timeLabel: string;
}
interface Waste {
  value: number;
  viewValue: string;
}
