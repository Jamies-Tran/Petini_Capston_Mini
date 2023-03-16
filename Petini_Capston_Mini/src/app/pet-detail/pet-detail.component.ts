import { Component, OnInit } from '@angular/core';
import { PetService } from '../services/pet.service';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.scss'],
})
export class PetDetailComponent implements OnInit {
  message: any;
  name!: string;
  values: any;
  imageUrl: any;
  valuePet:any[]=[];
  constructor(private http: PetService, private image: ImageService) {}
  ngOnInit(): void {
    try {
      let name = '';
      name = localStorage.getItem('getPetName') as string;
      this.http.getPetByName(name).subscribe(async (data) => {
        console.log(data);
        this.values = data;
        await this.image.getImage('pets/' + data.imageUrl).then((url) => {
          this.imageUrl = url;
        });
      });
    } catch (error) {}

     // Pet
     try {
      this.http.getPetListByStatus('NOT_ADOPTED').subscribe(
        async (data) => {
          this.valuePet = [];
          console.log('data:', data);
          if (data) {
            let value = data;
            console.log('value:', value);
            for (let i = 0; i <= 4; i++) {
              if (value[i] != undefined) {
                var imgUrl = await this.image.getImage(
                  'pets/' + value[i].imageUrl
                );
                console.log('imaURL:', imgUrl);
                let name = value[i].name;
                let price = value[i].price;
                this.valuePet.push({
                  name: name,
                  price: price,
                  imageUrl: imgUrl,
                });
              }
            }
            console.log('pet:', this.valuePet);
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
  public onPetSelector(name: string) {
    localStorage.setItem('getPetName', name);
  }
}
