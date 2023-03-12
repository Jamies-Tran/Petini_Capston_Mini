import { Component, OnInit } from '@angular/core';
import { AfterCareService } from '../../../services/after-care.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../../../pop-up/message/message.component';
import { SuccessComponent } from '../../../pop-up/success/success.component';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss'],
})
export class AddServiceComponent implements OnInit {
  name: any;
  price: any;
  description: any;
  file!: File;
  files: File[] = [];
  startDate!: string;
  showReview = false;
  ngOnInit(): void {
    this.convert();
  }
  convert(): void {
    var date = new Date(),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    this.startDate = [date.getFullYear(), mnth, day].join('-');
  }
  constructor(private http: AfterCareService,
    private storage: AngularFireStorage,
    public dialog: MatDialog){}
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
  time: Array<{startDate: string;
    timeValue: string;
    timeLabel: string;}> = [];

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
      startDate: this.startDate,
      timeValue: '0' + this.startTimeHour.toString() + ':00:00',
      timeLabel: '0' + this.startTimeHour.toString() + ':00',
    });

    for (let i = 0; i <= this.workMinute / this.waste; i++) {
      this.startTimeMinute = this.startTimeMinute + this.waste;
      if (
        (this.startTimeHour == 19 && this.startTimeMinute + this.waste > 60) ||
        (this.startTimeHour == 20 && this.startTimeMinute == 0)
      ) {
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
            startDate: this.startDate,
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
            startDate: this.startDate,
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
            startDate: this.startDate,
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
            startDate: this.startDate,
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
            startDate: this.startDate,
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
            startDate: this.startDate,
            timeValue: timeBoxValue + ':00',
            timeLabel: timeBoxValue,
          });
        }
      }
    }
  }
imageUrl!:string;
  addService() {
for(this.file of this.files){
  this.imageUrl = this.name + ' '+ this.file.name;
}

    if (this.valid() == true) {
      this.http.createService(
        this.time,
        this.description,
        this.imageUrl,
        this.name,
        this.price
      ).subscribe((data) =>{
        for (this.file of this.files) {
          const path = 'services/' + this.name as string + ' ' + this.file.name;
          const fileRef = this.storage.ref(path);
          this.storage.upload(path, this.file);
        }
        this.message= 'Tạo dịch vụ thành công';
        this.openDialogSuccess();
        this.name='';
        this.price=''
        this.time=[];
        this.description=''
        this.imageUrl=''
        location.reload();
      }, (error) => {
        this.message = error;
        this.openDialogMessage();
      })
    }
  }
  message: any;


  public valid() {
    if (!this.name || this.name == '') {
      this.message = 'Xin nhập tên dịch vụ';
      this.openDialogMessage();
      return;
    } else if (!this.price || this.price == '') {
      this.message = 'Xin nhập đơn giá';
      this.openDialogMessage();
      return;
    } else if (!this.description || this.description == '') {
      this.message = 'Xin nhập mô tả';
      this.openDialogMessage();
      return;
    } else if(!this.waste || this.waste == 0){
      this.message = 'Xin nhập thời gian cho dịch vụ';
      this.openDialogMessage();
      return;
    } else if(this.files.length ==0 ){
      this.message = "Xin chọn hình ảnh dịch vụ";
      this.openDialogMessage();
      return;
    }
    for (this.file of this.files) {
      if (!this.file) {
        console.log('kh co anh');
        this.message = 'Xin nhập ảnh sản phẩm vào';
        this.openDialogMessage();
        return;
      }
    }
    return true;
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

interface Waste {
  value: number;
  viewValue: string;
}
