import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../../pop-up/message/message.component';
import { SuccessComponent } from '../../pop-up/success/success.component';
import { ImageService } from '../../services/image.service';
import { ProductService } from '../../services/product.service';
import { AfterCareService } from '../../services/after-care.service';
@Component({
  selector: 'app-manage-service',
  templateUrl: './manage-service.component.html',
  styleUrls: ['./manage-service.component.scss']
})
export class ManageServiceComponent implements OnInit{
  values: data[] = [];

  value:[]=[];
  message!: string;
  status = 'sellin';
  i:any;
  imageUrl !: string;
  constructor(
    public dialog: MatDialog,
    private http: AfterCareService,
    private image: ImageService,
  ) {}
  ngOnInit(): void {
    this.http.getServiceList().subscribe(async (data) => {
      console.log(data);
      this.value = data;
      let waste = '';
        for (this.i of this.value) {
        let wasteValue = 0;
        var waste0 = this.i.afterCareWorkingSchedules[0].timeValue;
        let hours0 = waste0.slice(0,2) as number ;
        let minute0 = waste0.slice(3,5) as number;
        var waste1 = this.i.afterCareWorkingSchedules[1].timeValue;
        let hours1 = waste1.slice(0,2) as number;
        let minute1 = waste1.slice(3,5) as number ;
        wasteValue =   (  (hours1 * 60) + minute1  ) - (  (hours0 * 60) + minute0 ) ;
        if(wasteValue == 6000){
          wasteValue = 60;
        }
        waste = wasteValue as unknown as string;
        this.imageUrl = this.i.imageUrl as string;
        await this.image
            .getImage('services/' + this.i.imageUrl)
            .then((url) => {
              this.imageUrl = url;

            })
            .catch((error) => {

            });
        this.values.push({
          id: this.i.id,
          name: this.i.name,
          description: this.i.description,
          status: this.i.status,
          waste: waste,
          price: this.i.price,
          imageUrl:this.imageUrl
        });
        console.log(this.status);
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

  public onItemSelector(id: number, name: string) {
    localStorage.setItem('id', id + '');
    localStorage.setItem('getServiceName', name);
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
export interface data {
  id: number;
  name: string;
  description: string;
  status: string;
  waste: string;
  price: string;
  imageUrl:string;
}


