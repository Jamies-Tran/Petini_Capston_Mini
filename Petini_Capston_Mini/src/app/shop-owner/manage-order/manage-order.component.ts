import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from 'src/app/pop-up/message/message.component';
import { SuccessComponent } from 'src/app/pop-up/success/success.component';
import { ImageService } from 'src/app/services/image.service';
import { OrderService } from 'src/app/services/order.service';
import { DeleteComponent } from '../../pop-up/delete/delete.component';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss'],
})
export class ManageOrderComponent implements OnInit {
  valuesAll: any[] = [];
  valuesPending: any[] = [];
  valuesFinished: any[] = [];
  valuesCancel: any[] = [];
  i: any;
  message!: string;

  constructor(
    public dialog: MatDialog,
    private image: ImageService,
    private http: OrderService
  ) {}
  ngOnInit(): void {
    // All
    this.http.getAllOrders().subscribe(async (data) => {
      this.valuesAll = data;
      console.log(data);
    });

    // Pending
    this.http.getOrderByStatusPENGDING().subscribe(
      (data) => {
        this.valuesPending = data;
      },
      (error) => {
        console.log(error);
      }
    );

    // Accept
    this.http.getOrderByStatusACCEPT().subscribe(
      (data) => {
        this.valuesFinished = data;
      },
      (error) => {
        console.log(error);
      }
    );

    // Reject
    this.http.getOrderByStatusREJECT().subscribe(
      (data) => {
        this.valuesCancel = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public onItemSelector(id: number) {
    localStorage.setItem('getOrderId', id + '');
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

  accept(event: number) {
    let id =event;
    console.log(id);
    this.http.acceptOrder(id).subscribe(
      (data) => {
        localStorage.setItem('orderAccept', 'true');
        this.message = 'Xác nhận đơn hàng thành công';
        this.openDialogSuccess();
      },
      (error) => {
        this.message = error;
        this.openDialogMessage();
      }
    );
  }

  reject(event:number){
    let id =event;
    console.log(id);
    this.message =" Bạn có chắc từ chối đơn hàng này"
    this.dialog.open(DeleteComponent, {
      data: { data: this.message, name: id , filter:'order'},
    });
  }
}
