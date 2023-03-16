import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageService } from '../../services/image.service';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-manage-pet',
  templateUrl: './manage-pet.component.html',
  styleUrls: ['./manage-pet.component.scss'],
})
export class ManagePetComponent implements OnInit {
  valuesNOT_ADOPTED: any;
  valuesADOPTED: any;
  i: any;
  message!: string;
  datas: any;

  constructor(
    public dialog: MatDialog,
    private image: ImageService,
    private http: PetService
  ) {}
  ngOnInit(): void {
    // ADOPTED
    this.valuesADOPTED = [];
    this.datas = [];
    this.http.getPetListByStatus('ADOPTED').subscribe(async (data) => {
      console.log(data);
      this.datas = data;
      this.valuesADOPTED = this.datas;
      for(let i =0; i<this.valuesADOPTED.length ; i++){
        var imgUrl = await this.image.getImage('pets/' + this.valuesADOPTED[i].imageUrl);
        console.log(this.valuesADOPTED[i].imageUrl);
        this.valuesADOPTED[i].imageUrl = imgUrl;
      }
      // console.log(this.valuesADOPTED);
    });

    // NOT ADOPTED
    this.valuesNOT_ADOPTED = [];
    this.datas = [];
    this.http.getPetListByStatus('NOT_ADOPTED').subscribe(async (data) => {
      console.log(data);
      this.datas = data;
      this.valuesNOT_ADOPTED = this.datas;

      for(let i =0; i<this.valuesNOT_ADOPTED.length ; i++){
        var imgUrl = await this.image.getImage('pets/' + this.valuesNOT_ADOPTED[i].imageUrl);
        console.log(this.valuesNOT_ADOPTED[i].imageUrl);
        this.valuesNOT_ADOPTED[i].imageUrl = imgUrl;
      }
      // console.log(this.valuesNOT_ADOPTED);
    });
  }

  public onItemSelector(name: string) {
    localStorage.setItem('getPetName', name);
  }

}
