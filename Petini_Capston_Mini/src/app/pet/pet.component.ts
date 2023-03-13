import { Component, OnInit } from '@angular/core';
import { PetService } from '../services/pet.service';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit{
  values : any[]=[];
  value:any;

  public onItemSelector(name: string) {
    localStorage.setItem('getPetName', name);
  }

ngOnInit(): void {
  this.http.getPetListByStatus('NOT_ADOPTED').subscribe(async (data) => {
    console.log(data);
    for(this.value of data){

          var imgUrl = await this.image.getImage('pets/' + this.value.imageUrl)
          console.log("imaURL:" , imgUrl);
          this.values.push({imgURL:imgUrl, name:this.value.name, age:this.value.age, weight:this.value.weight })
          console.log("values:", this.values);



      }
      });
}

constructor(private http: PetService,private image: ImageService){}
}
