import { Component, OnInit } from '@angular/core';
import { PetService } from '../services/pet.service';
import { ImageService } from '../services/image.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../pop-up/message/message.component';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss'],
})
export class PetComponent implements OnInit {
  values: any[] = [];
  value: any;
  sName!: string;
  sTo!: number;
  sFrom!: number;
  sColor!: string;
  sType!: string;

  public onItemSelector(name: string) {
    localStorage.setItem('getPetName', name);
  }

  ngOnInit(): void {
    this.http.getPetListByStatus('NOT_ADOPTED').subscribe(
      async (data) => {
        console.log(data);
        for (this.value of data) {
          var imgUrl = await this.image.getImage('pets/' + this.value.imageUrl);
          console.log('imaURL:', imgUrl);
          this.values.push({
            imgURL: imgUrl,
            name: this.value.name,
            age: this.value.age,
            weight: this.value.weight,
          });
          console.log('values:', this.values);
        }
      },
      (error) => {
        this.message = error;
        this.openDialogMessage();
      }
    );
  }

  getPetByName() {
    this.http.getPetByName(this.sName).subscribe(
      async (data) => {
        if (data) {
          this.value = data;
          console.log(data.length > 0);
          this.values = [];

          var imgUrl = await this.image.getImage('pets/' + this.value.imageUrl);
          console.log('imaURL:', imgUrl);
          this.values.push({
            imgURL: imgUrl,
            name: this.value.name,
            age: this.value.age,
            weight: this.value.weight,
          });
          console.log('values:', this.values);
        }
        console.log(data.length > 0);
      },
      (error) => {
        this.message = error;
        this.openDialogMessage();
      }
    );
  }

  getPetListByAgeRange() {
    this.http.getPetListByAgeRange(this.sFrom, this.sTo).subscribe(
      async (data) => {
        if (data) {
          this.values = [];
          for (this.value of data) {
            var imgUrl = await this.image.getImage(
              'pets/' + this.value.imageUrl
            );
            console.log('imaURL:', imgUrl);
            this.values.push({
              imgURL: imgUrl,
              name: this.value.name,
              age: this.value.age,
              weight: this.value.weight,
            });
            console.log('values:', this.values);
          }
        }
        console.log(data.length > 0);
      },
      (error) => {
        this.message = error;
        console.log(error.message);
        this.openDialogMessage();
      }
    );
  }

  getPetListByColor() {
    this.http.getPetListByColor(this.sColor).subscribe(
      async (data) => {
        if (data) {
          console.log(data);
          this.values = [];
          for (this.value of data) {
            var imgUrl = await this.image.getImage(
              'pets/' + this.value.imageUrl
            );
            console.log('imaURL:', imgUrl);
            this.values.push({
              imgURL: imgUrl,
              name: this.value.name,
              age: this.value.age,
              weight: this.value.weight,
            });
            console.log('values:', this.values);
          }
        }
        console.log(data.length > 0);
      },
      (error) => {
        this.message = error;
        this.openDialogMessage();
      }
    );
  }

  getPetListByType() {
    this.http.getPetListByType(this.sType).subscribe(
      async (data) => {
        if (data) {
          this.values = [];
          for (this.value of data) {
            var imgUrl = await this.image.getImage(
              'pets/' + this.value.imageUrl
            );
            console.log('imaURL:', imgUrl);
            this.values.push({
              imgURL: imgUrl,
              name: this.value.name,
              age: this.value.age,
              weight: this.value.weight,
            });
            console.log('values:', this.values);
          }
        }
      },
      (error) => {
        this.message = error;
        this.openDialogMessage();
      }
    );
  }
  message: any;
  openDialogMessage() {
    this.dialog.open(MessageComponent, {
      data: this.message,
    });
  }
  constructor(
    private http: PetService,
    private image: ImageService,
    public dialog: MatDialog
  ) {}
}
