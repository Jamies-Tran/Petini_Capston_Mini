import { Component, OnInit } from '@angular/core';
import { MessageComponent } from '../pop-up/message/message.component';
import { MatDialog } from '@angular/material/dialog';
import { ImageService } from '../services/image.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessComponent } from '../pop-up/success/success.component';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  isLogin = false;
  valueProduct:any[]=[];
  ngOnInit(): void {
    try {
      const name = localStorage.getItem('getItemsName') as string;
      console.log(name);
      this.httpProduct.getProductDetail(name).subscribe(
        async (data) => {
          console.log(data);
          this.name = data['name'];
          this.description = data['description'];
          this.status = '';
          this.quantity = data['quantity'];
          this.price = data['price'];

          // get file image
          await this.image
            .getImage('items/' + data['imageUrl'])
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
    } catch (error) {}
     // Product
     try {
      this.httpProduct.getProductList().subscribe(
        async (data) => {
          this.valueProduct = [];
          console.log('data:', data);
          if (data) {
            let value = data;
            console.log('value:', value);
            for (let i = 0; i <= 4; i++) {
              if (value[i] != undefined ) {
                var imgUrl = await this.image.getImage(
                  'items/' + value[i].imageUrl
                );
                console.log('imaURL:', imgUrl);
                let name = value[i].name;
                let price = value[i].price;
                this.valueProduct.push({
                  name: name,
                  price: price,
                  imageUrl: imgUrl,
                });
              }
            }
            console.log('product:', this.valueProduct);
          }
        },
        (error) => {
          console.log('error', error);
        }
      );
    } catch (error) {
      console.log('error', error);
    }
  }
  constructor(
    private image: ImageService,
    public dialog: MatDialog,
    private httpProduct: ProductService,
    private httpCart: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  message = '';
  name = '';
  description = '';
  status = '';
  imageUrl = '';
  quantity = 0;
  price = '';
  amount = 0;

  openDialogMessage() {
    this.dialog.open(MessageComponent, {
      data: this.message,
    });
  }

  addToCart() {
    if (localStorage.getItem('userToken')) {
      console.log(this.amount);
      this.httpCart.addProductToShoppingCart(this.name, this.amount).subscribe(
        (data) => {
          console.log('suces');
          this.message = 'Thành Công';
          this.openDialogSuccess();
        },
        (error) => {
          this.message = error;
          this.openDialogMessage();
        }
      );
    } else {
      this.message = 'Mời bạn đăng nhập ';
      this.openDialogMessage();
    }
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
  public onItemSelector(name: string) {
    localStorage.setItem('getItemsName', name);
  }
}
