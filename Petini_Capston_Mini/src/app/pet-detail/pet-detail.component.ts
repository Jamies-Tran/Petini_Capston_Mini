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
  }
}
