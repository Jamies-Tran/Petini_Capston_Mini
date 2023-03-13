import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../../pop-up/message/message.component';
import { SuccessComponent } from '../../pop-up/success/success.component';
import { ImageService } from '../../services/image.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-manage-item',
  templateUrl: './manage-item.component.html',
  styleUrls: ['./manage-item.component.scss'],
})
export class ManageItemComponent implements OnInit {
  values: data[] = [];
  i: any;
  message!: string;

  constructor(
    public dialog: MatDialog,
    private image: ImageService,
    private http: ProductService
  ) {}
  ngOnInit(): void {
    this.http.getProductList().subscribe(async (data) => {
      console.log(data);
      for (this.i of data) {
        var imgUrl = await this.image.getImage('items/' + this.i.imageUrl);
        this.values.push({
          id: this.i.id,
          name: this.i.name,
          description: this.i.description,
          status: this.i.status,
          imageUrl: imgUrl,
          quantity: this.i.quantity,
          price: this.i.price,
        });

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
  quantity: string;
  price: string;
}
