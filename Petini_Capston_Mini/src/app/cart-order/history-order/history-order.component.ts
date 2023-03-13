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
  values:any;
  constructor(private http:OrderService , private image: ImageService){  }

  ngOnInit(): void {
      try {
        let name = localStorage.getItem('username') as string;
        this.http.getAllOrderOfCustomer(name).subscribe((data)=>{
          console.log(data);
        },(error)=>{
          console.log(error);
        })
      } catch (error) {

      }
  }
}
