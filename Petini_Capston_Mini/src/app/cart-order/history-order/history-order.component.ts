import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-history-order',
  templateUrl: './history-order.component.html',
  styleUrls: ['./history-order.component.scss']
})
export class HistoryOrderComponent implements OnInit{
  message:any;
  values:any[]=[];
  constructor(private http:OrderService , private image: ImageService){  }

  ngOnInit(): void {
      try {
        let name = localStorage.getItem('username') as string;
        this.http.getAllOrderOfCustomer(name).subscribe(async (data)=>{
          console.log(data);
          let datas = data;
          let carts: any[] = [];
          let productName = '';
          let productQuantity = '';
          let totalPrice = '';
          let createdBy = '';
          let price = '';
          let createdDate= '';
          let imageUrl = '' ;
          if (data) {
            for (let data of datas) {
              carts = [];
              let cart = data.cart;
              for (let cartProduct of cart.cartProduct) {
                let product = cartProduct.product;
                productName = product.name;
                productQuantity = cartProduct.quantity;
                price = product.price;
                await this.image.getImage('items/' + product.imageUrl).then((url)=>{
                  imageUrl = url;
                })
                carts.push({ product: productName, quantity: productQuantity, price:price, imageUrl:imageUrl});
              }
              totalPrice = cart.totalPrice;
              createdBy = data.createdBy;
              createdDate = data.createdDate;
              this.values.push({
                name: createdBy,
                carts: carts,
                total: totalPrice,
                status: data.status,
                id: data.id,
                createdDate:createdDate
              });
            }
          }
          console.log(this.values);
        },(error)=>{
          console.log(error);
        })
      } catch (error) {

      }
  }
}
