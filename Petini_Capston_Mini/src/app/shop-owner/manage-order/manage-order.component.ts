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
      let datas = data;
      console.log(data);
      let carts: any[] = [];
      let productName = '';
      let productQuantity = '';
      let totalPrice = '';
      let createdBy = '';
      if (data) {
        for (let data of datas) {
          carts = [];
          let cart = data.cart;
          for (let cartProduct of cart.cartProduct) {
            let product = cartProduct.product;
            productName = product.name;
            var imgUrl = await this.image.getImage(
              'items/' + product.imageUrl
            );
            productQuantity = cartProduct.quantity;
            carts.push({
              product: productName,
              quantity: productQuantity,
              imageUrl: imgUrl,
            });
          }
          totalPrice = cart.totalPrice;
          createdBy = data.createdBy;
          this.valuesAll.push({
            name: createdBy,
            carts: carts,
            total: totalPrice,
            status: data.status,
            id: data.id,
          });
        }
      }

      console.log(this.valuesAll);
    });

    // Pending
    this.http.getOrderByStatusPENGDING().subscribe(
      async (data) => {
        console.log('pending', data);
        let datas = data;
        let carts: any[] = [];
        let productName = '';
        let productQuantity = '';
        let totalPrice = '';
        let createdBy = '';

        if (data) {
          for (let data of datas) {
            carts = [];
            let cart = data.cart;
            for (let cartProduct of cart.cartProduct) {
              let product = cartProduct.product;
              productName = product.name;
              productQuantity = cartProduct.quantity;
              var imgUrl = await this.image.getImage(
                'items/' + product.imageUrl
              );
              carts.push({
                product: productName,
                quantity: productQuantity,
                imageUrl: imgUrl,
              });
            }
            totalPrice = cart.totalPrice;
            createdBy = data.createdBy;
            this.valuesPending.push({
              name: createdBy,
              carts: carts,
              total: totalPrice,
              status: data.status,
              id: data.id,
            });
          }
        }

        console.log(this.valuesPending);
      },
      (error) => {
        console.log(error);
      }
    );

    // Accept
    this.http.getOrderByStatusACCEPT().subscribe(
      async (data) => {
        console.log('accept', data);
        let datas = data;
        let carts: any[] = [];
        let productName = '';
        let productQuantity = '';
        let totalPrice = '';
        let createdBy = '';
        if (data) {
          for (let data of datas) {
            carts = [];
            let cart = data.cart;
            for (let cartProduct of cart.cartProduct) {
              let product = cartProduct.product;
              productName = product.name;
              productQuantity = cartProduct.quantity;
              var imgUrl = await this.image.getImage(
                'items/' + product.imageUrl
              );
              carts.push({
                product: productName,
                quantity: productQuantity,
                imageUrl: imgUrl,
              });
            }
            totalPrice = cart.totalPrice;
            createdBy = data.createdBy;
            this.valuesFinished.push({
              name: createdBy,
              carts: carts,
              total: totalPrice,
              status: data.status,
              id: data.id,
            });
          }
        }

        console.log(this.valuesFinished);
      },
      (error) => {
        console.log(error);
      }
    );

    // Reject
    this.http.getOrderByStatusREJECT().subscribe(
      async (data) => {
        console.log('reject', data);
        let datas = data;
        let carts: any[] = [];
        let productName = '';
        let productQuantity = '';
        let totalPrice = '';
        let createdBy = '';
        if (data) {
          for (let data of datas) {
            carts = [];
            let cart = data.cart;
            for (let cartProduct of cart.cartProduct) {
              let product = cartProduct.product;
              productName = product.name;
              productQuantity = cartProduct.quantity;
              var imgUrl = await this.image.getImage(
                'items/' + product.imageUrl
              );
              carts.push({
                product: productName,
                quantity: productQuantity,
                imageUrl: imgUrl,
              });
            }
            totalPrice = cart.totalPrice;
            createdBy = data.createdBy;
            this.valuesCancel.push({
              name: createdBy,
              carts: carts,
              total: totalPrice,
              status: data.status,
              id: data.id,
            });
          }
        }

        console.log(this.valuesCancel);
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
    let id = event;
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

  reject(event: number) {
    let id = event;
    console.log(id);
    this.message = ' Bạn có chắc từ chối đơn hàng này';
    this.dialog.open(DeleteComponent, {
      data: { data: this.message, name: id, filter: 'order' },
    });
  }
}
