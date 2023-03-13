import { Component, OnInit } from '@angular/core';
import { SuccessComponent } from '../../../pop-up/success/success.component';
import { MessageComponent } from '../../../pop-up/message/message.component';
import { NgForm } from '@angular/forms';
import { PetService } from '../../../services/pet.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ImageService } from '../../../services/image.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss'],
})
export class AddPetComponent implements OnInit {
  ngOnInit(): void {
    this.items.push({
      name: '',
      color: '',
      gender: this.genders[0].value,
      description: '',
      imageUrl: '',
      files: [],
      file: this.file,
      showDiv: false,
      age: 0,
      petType: '',
      weight: 0,
    });
  }
  constructor(
    private http: PetService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    private image: ImageService,
    public dialog: MatDialog
  ) {}
  // name!: any;
  // price!: any;
  // quantity!: any;
  // description!: any;
  // imageUrl!: any;
  items: {
    name: any;
    color: any;
    gender: any;
    description: any;
    imageUrl: any;
    files: File[];
    file: File;
    showDiv: boolean;
    age: any;
    petType: string;
    weight: number;
  }[] = [];

  //
  file!: File;

  showDiv = true;
  onSelect(files: any, i: any) {
    this.items[i].files.push(...files.addedFiles);
    for (this.file of this.items[i].files) {
      this.items[i].imageUrl = this.file.name;
      this.items[i].file = this.file;
      this.items[i].showDiv = true;
      console.log('imagUrl:', this.items[i].imageUrl);
      console.log('file:', this.items[i].file);
      console.log('showdiv:', this.items[i].showDiv);
    }

    // console.log(event);
    // this.files.push(...files.addedFiles);

    // for (this.file of this.files) {
    //   this.items[i].imageUrl = this.file.name;
    //   this.items[i].file = this.file;
    // }
    // console.log(this.imageUrl);
    // if (this.files.length >= 1) {
    //   this.showDiv = false;
    // }
  }

  onRemove(event: File, i: any) {
    this.items[i].imageUrl = '';
    this.items[i].file = this.file;
    this.items[i].showDiv = false;
    console.log('imagUrl:', this.items[i].imageUrl);
    console.log('file:', this.items[i].file);
    // console.log(event);
    // this.files.splice(this.files.indexOf(event), 1);
    // this.imageUrl = '';
    // console.log(this.imageUrl);
    // console.log('files lenght: ', this.files.length);
    // if (this.files.length >= 1) {
    //   this.showDiv = false;
    // } else {
    //   this.showDiv = true;
    // }
  }

  addMoreItems() {
    this.items.push({
      name: '',
      color: '',
      gender: this.genders[0].value,
      description: '',
      imageUrl: '',
      files: [],
      file: this.file,
      showDiv: false,
      age: 0,
      petType: '',
      weight: 0,
    });
  }

  removeItems(i: any) {
    this.items.splice(i, 1);
  }
  message: any;
  isValidImage = false;
  addPet(form: NgForm) {
    if (this.valid() == true) {
      type itemsList = Array<{
        age: number;
        color: string;
        description: string;
        gender: string;
        imageUrl: string;
        name: string;
        petType: string;
        weight: number;
      }>;
      const myItemsList: itemsList = [];
      for (let item of this.items) {
        if (item.file) {
          myItemsList.push({
            age: item.age,
            color: item.color,
            description: item.description,
            gender: item.gender,
            imageUrl: item.name + ' ' + item.imageUrl,
            name: item.name,
            petType: item.petType,
            weight: item.weight,
          });
        }
      }
      console.log(myItemsList);

      this.http.createPetList(myItemsList).subscribe((data) => {
        for (let value of this.items) {
          this.file = value.file;
          const path = 'pets/' + value.name + ' ' + this.file.name;
          const fileRef = this.storage.ref(path);
          this.storage.upload(path, this.file);
        }
        console.log(data);
        console.log('success');
        this.items = [
          {
            name: '',
            color: '',
            gender: this.genders[0].value,
            description: '',
            imageUrl: '',
            files: [],
            file: this.file,
            showDiv: false,
            age: 0,
            petType: '',
            weight: 0,
          },
        ];
        form.resetForm();
        this.message = 'Đăng thú cưng thành công';
        this.openDialogSuccess();
      });
    } else this.openDialogMessage();
  }

  public valid() {
    for (let item of this.items) {
      if (!item.file) {
        console.log('kh co anh');
        this.message = 'Xin nhập ảnh thú cưng vào';
        return;
      }
    }
    if (this.items.length > 1) {
      for (let i = 0; i < this.items.length; i++) {
        let j = i + 1;
        if (j >= this.items.length) {
          return true;
        } else if (this.items[i].name == this.items[j].name) {
          this.message =
            'Tên thú cưng ' +
            this.items[j].name +
            ' bị trùng với ' +
            this.items[i].name;
          this.openDialogMessage();
          return;
        }
      }
    }

    return true;
  }

  openDialogMessage() {
    this.dialog.open(MessageComponent, {
      data: this.message,
    });
  }
  openDialogSuccess() {
    this.dialog.open(SuccessComponent, {
      data: this.message,
    });
  }
  genders: Gender[] = [
    {
      value: 'Đực',
    },
    {
      value: 'Cái',
    },
  ];
}
export interface Gender {
  value: string;
}
