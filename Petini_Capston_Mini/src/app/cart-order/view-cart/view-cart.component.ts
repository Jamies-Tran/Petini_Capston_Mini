import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SuccessComponent } from '../../pop-up/success/success.component';
import { MessageComponent } from '../../pop-up/message/message.component';
import { ImageService } from '../../services/image.service';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss'],
})
export class ViewCartComponent implements OnInit {
  value: data[] = [];
  totalPrice=0;
  cart: any;
  status:any;

  ngOnInit(): void {
    this.httpCart.getCustomerShoppingCart().subscribe(
      async (data) => {
        if(data){
          console.log(data);
          const cartProduct = data['cartProduct'];
          let imgUrl = '';
          this.status = data.status as string;
          console.log(this.status);

          for (let i of cartProduct) {
            await this.image
              .getImage('items/' + i.product.imageUrl)
              .then((url) => {
                imgUrl = url;
              })
              .catch((error) => {});

            this.value.push({
              name: i.product.name,
              description: i.product.description,
              price: i.product.price,
              quantity: i.quantity,
              imageUrl: imgUrl,

            });

          }
          for(let item of this.value){
            this.totalPrice = this.totalPrice + (item.price * item.quantity);
          }
        }


        console.log(this.totalPrice);
        console.log(this.value);
      },
      (error) => {
        console.log(error);
        this.message = error;
      }
    );
  }
  message: any;
  constructor(
    private httpCart: CartService,
    public dialog: MatDialog,
    private image: ImageService,
    private httpOrder: OrderService
  ) {}
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
  openDialogMessage() {
    this.dialog.open(MessageComponent, {
      data: this.message,
    });
  }

  order() {
    this.httpOrder.createOrder().subscribe((data) =>{
      this.message = " Đặt hàng thành công";
      this.openDialogSuccess();
      setTimeout(function(){
        window.location.reload();
     }, 2000);

    },(error)=>{
      this.message=error;
      this.openDialogMessage();
    })
  }
}

export interface data {
  name: string;
  description: string;
  imageUrl: string;
  quantity: number;
  price: number;

}
