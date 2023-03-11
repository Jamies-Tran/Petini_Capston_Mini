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
  time:Time[]=[];
  waste=20;
  workTime = 12;
  minute = 60;
  workMinute = this.workTime * this.minute;
  timeValue :any;
  startTimeHour=8;
  startTimeMinute=0;
  endTime=16;

  getTimeBox(){
    for(let i =0 ; i<=this.workMinute / this.waste; i = i+this.waste){
      // dk ( khoảng thời gian + time box Phút ) < 60 phút
      if( (i + this.startTimeMinute) < this.minute ){
        if(this.startTimeHour < 10){
          let timeValueHour = this.startTimeHour.toString();
          let timeValueMinute = (i + this.startTimeMinute).toString();
        this.time.push({timeValue:'0'+ timeValueHour + ':',timeLabel:""  });
        }


      }
    }

  }

}
export interface Time{
  timeValue:string;
  timeLabel:string;
}
