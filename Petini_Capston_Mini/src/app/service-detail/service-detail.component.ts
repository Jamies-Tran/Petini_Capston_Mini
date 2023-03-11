import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { MatDialog } from '@angular/material/dialog';
import { AfterCareService } from '../services/after-care.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SuccessComponent } from '../pop-up/success/success.component';
import { MessageComponent } from '../pop-up/message/message.component';

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


  message = '';
  name = '';
  description = '';
  status = '';
  imageUrl = '';
  waste = 0;
  price = '';

  ngOnInit(): void {
    this.get3Day();
      try {
      if (localStorage.getItem('userToken')) {
        const name = localStorage.getItem('getServiceName') as string;
        console.log(name);
        this.httpService.getServiceDetail(name).subscribe(
          async (data) => {
            console.log(data);
            this.name = data['name'];
            this.description = data['description'];
            this.status = '';
            this.price = data['price'];
            this.time.push(data['afterCareWorkingHours']);

            // get file image
            await this.image
              .getImage('services/' + data['imageUrl'])
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
      } else {
        this.router.navigate(['/Login'], { relativeTo: this.route });
      }
    } catch (error) {}
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
   httpBooking: any;
  constructor(
    private image: ImageService,
    public dialog: MatDialog,
    private httpService: AfterCareService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
}

interface Date{
  value:string;
  viewValue:string
}
interface Time{
  value:string;
  status:boolean;
}
