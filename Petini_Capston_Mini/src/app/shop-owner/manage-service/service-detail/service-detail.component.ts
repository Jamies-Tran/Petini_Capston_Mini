import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ImageService } from '../../../services/image.service';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AfterCareService } from '../../../services/after-care.service';
import { MessageComponent } from '../../../pop-up/message/message.component';
import { SuccessComponent } from '../../../pop-up/success/success.component';
import { DeleteComponent } from '../../../pop-up/delete/delete.component';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss'],
})
export class ServiceDetailComponent implements OnInit {
  form!: NgForm;
  name: any;
  price: any;
  description: any;
  file!: File;
  files: File[] = [];
  itemFile!: File;
  showReview = false;
  status: any;
  waste: any;
  time: Array<{
    startDate: string;
    timeValue: string;
    timeLabel: string;
  }> = [];
  message!: string;
  isUpdate = false;
  value: any;
  startDate!: string;
  convert(): void {
    var date = new Date(),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    this.startDate = [date.getFullYear(), mnth, day].join('-');
  }
  constructor(
    private image: ImageService,
    public dialog: MatDialog,
    private http: AfterCareService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.convert();
    try {
      let name = localStorage.getItem('getServiceName') as string;
      this.http.getServiceDetail(name).subscribe(async (data) => {
        this.value = data;
        this.name = this.value.name;
        this.price = this.value.price;
        this.description = this.value.description;
        this.status = this.value.status;
        for (let item of this.value.afterCareWorkingSchedules) {
          this.time.push({
            startDate: this.startDate,
            timeValue: item.timeValue,
            timeLabel: item.timeLabel,
          });
        }
        // get file image
        await this.image
          .getImage('services/' + this.value.imageUrl)
          .then((url) => {
            this.imageUrl = url;
            this.validUrl = false;
          })
          .catch((error) => {
            this.validUrl = true;
          });

        let waste = '';
        let wasteValue = 0;
        var waste0 = this.value.afterCareWorkingSchedules[0].timeValue;
        let hours0 = waste0.slice(0, 2) as number;
        let minute0 = waste0.slice(3, 5) as number;
        var waste1 = this.value.afterCareWorkingSchedules[1].timeValue;
        let hours1 = waste1.slice(0, 2) as number;
        let minute1 = waste1.slice(3, 5) as number;
        wasteValue = hours1 * 60 + minute1 - (hours0 * 60 + minute0);
        if (wasteValue == 6000) {
          wasteValue = 60;
        }
        waste = wasteValue as unknown as string;
        this.waste = waste;
        for (let i = 0; i < this.wastes.length; i++) {
          if (this.waste == (this.wastes[i].value as unknown as string)) {
            this.waste = this.wastes[i].value;
          }
        }
      });
    } catch (error) {
      this.message = 'Lỗi';
      this.openDialogMessage();
    }
  }
  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
    if (this.files.length >= 1) {
      this.showReview = true;
    } else {
      this.itemFile;
      this.showReview = false;
    }
  }

  onSelect(files: any) {
    this.files.push(...files.addedFiles);
    for (this.file of this.files) {
      this.itemFile = this.file;
      console.log(this.itemFile);
    }
    if (this.files.length >= 1) {
      this.showReview = true;
    }
  }

  updateService() {
    this.valid();

    this.http
      .updateService(
        this.time,
        this.description,
        this.imageUrl,
        this.value.name,
        this.name,
        this.price
      )
      .subscribe(
        (data) => {
          const path = 'services/' + this.value.name + ' ' + this.itemFile.name;
          const fileRef = this.storage.ref(path);
          this.storage.upload(path, this.itemFile);

          localStorage.setItem('getServiceName', this.name);
          this.message = 'Thành công';
          this.openDialogSuccess();
          setTimeout(function(){
            window.location.reload();
         }, 3000);
        },
        (error) => {
          this.message = error.message;
          this.openDialogMessage();
        }
      );
  }

  public valid() {
    if (!this.name || this.name == '') {
      this.name = this.value.name;
    } else if (!this.price || this.price == '') {
      this.price = this.value.price;
    } else if (!this.description || this.description == '') {
      this.description = this.value.description;
    } else if (this.showReview) {
      this.imageUrl = this.name + ' ' + this.itemFile.name;
    } else if (!this.showReview) {
      this.imageUrl = this.value.imageUrl;
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
  startTimeHour = 0;
  startTimeMinute = 0;
  workTime = 12;
  minute = 60;
  workMinute = 720; // 720
  timeValue: any;
  endTime = 20;

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

  isUpdateImage = false;
  validUrl = false;
  imageUrl!: string;
  updateImage() {
    if (!this.validUrl && this.isUpdate) {
      this.isUpdateImage = true;
    } else {
      this.isUpdateImage = false;
    }
  }
  fixImage() {
    if (this.validUrl) {
      this.isUpdateImage = true;
    } else {
      this.isUpdateImage = false;
    }
  }

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

  getTimeBox() {
    this.time = [];
    this.startTimeHour = 8;
    this.startTimeMinute = 0;

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

          this.time.push({
            startDate: this.startDate,
            timeValue: timeBoxValue + ':00',
            timeLabel: timeBoxValue,
          });
        }
      }
    }
  }
  openDialogDelete() {
    this.message = "Bạn có chắc xóa bỏ dịch vụ này";
    this.dialog.open(DeleteComponent, {
      data: { data: this.message, name: this.value.name , filter:'service'},
    });
  }
}

interface Waste {
  value: number;
  viewValue: string;
}
