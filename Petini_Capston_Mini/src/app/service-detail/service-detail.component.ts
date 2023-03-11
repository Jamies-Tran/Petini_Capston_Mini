import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit{
  selectedDate!:string;
  date:Date[]=[];
  time:Time[]=[];
  distanceTime= 30;


  get3Day(){

    // day1
    const day1 = new Date();
    let valueDay1 ='';
    let viewValueDay1 ='';
    var date = new Date(day1),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
     valueDay1 = [date.getFullYear() , mnth , day ].join('-');
     viewValueDay1 = "Hôm nay, " + [day, mnth,date.getFullYear() ].join('-');

    // day2
    const day2 = new Date();
    let valueDay2 ='';
    let viewValueDay2 ='';
    day2.setDate(day2.getDate() +1);
    var date = new Date(day2),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
      valueDay2 = [date.getFullYear() , mnth , day ].join('-');
     viewValueDay2 = "Ngày mai, " + [day, mnth,date.getFullYear() ].join('-');

    // day3
    const day3 = new Date();
    let valueDay3 ='';
    let viewValueDay3 ='';
    day3.setDate(day3.getDate() +2);
    var date = new Date(day3),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
      valueDay3 = [date.getFullYear() , mnth , day ].join('-');
      viewValueDay3 = "Ngày mốt, " + [day, mnth,date.getFullYear() ].join('-');

    console.log("hom nay 11-03-2023:    ", valueDay1)
    console.log("ngay mai 12-03-2023:   ", valueDay2)
    console.log("ngay mot 13-03-2023    ", valueDay3)

    this.date.push({value:valueDay1,viewValue:viewValueDay1},{value:valueDay2,viewValue:viewValueDay2},{value:valueDay3,viewValue:viewValueDay3});

  }

  getTimeBox(){

  }

  ngOnInit(): void {
    this.get3Day();
  }

}

interface Date{
  value:string;
  viewValue:string
}
interface Time{
  value:string;
  status:boolean;
}
