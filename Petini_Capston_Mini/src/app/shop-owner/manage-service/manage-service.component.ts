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

  i: any;
  message!: string;
  status = 'sellin';

  constructor(
    public dialog: MatDialog,
    private image: ImageService,
    private http: AfterCareService
  ) {}
  ngOnInit(): void {
    this.http.getServiceList().subscribe(async (data) => {
      console.log(data);
      for (this.i of data) {
        var imgUrl = await this.image.getImage('services/' + this.i.imageUrl);
        this.values.push({
          id: this.i.id,
          name: this.i.name,
          description: this.i.description,
          status: this.i.status,
          imageUrl: imgUrl,
          waste: '30',
          price: this.i.price,
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
    localStorage.setItem('getItemsName', name);
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
  imageUrl: string;
  waste: string;
  price: string;
}


