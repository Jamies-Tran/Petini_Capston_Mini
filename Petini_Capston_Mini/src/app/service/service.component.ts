import { Component } from '@angular/core';
import { ImageService } from '../services/image.service';
import { AfterCareService } from '../services/after-care.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent {
  values : any[]=[];
  value:any;

  public onItemSelector(name: string) {
    localStorage.setItem('getServiceName', name);
  }

  ngOnInit(): void {
    this.http.getServiceList().subscribe(async  (data) =>{

      // for(this.i of this.value ){
      //   console.log(this.i.homestayImages[0].url)
      // }
      console.log("data" , data);

      for(this.value of data){
        if(this.value.status == 'SELLING'){
          var imgUrl = await this.image.getImage('items/' + this.value.imageUrl)
          console.log("imaURL:" , imgUrl);
          this.values.push({imgURL:imgUrl, name:this.value.name, price:this.value.price, status:this.value.status })
          console.log("values:", this.values);
        }


      }

    })
  }
  constructor(private image: ImageService,private http: AfterCareService){

  }
}
