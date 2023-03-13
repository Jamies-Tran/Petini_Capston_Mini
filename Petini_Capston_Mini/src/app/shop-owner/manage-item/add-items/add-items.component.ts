import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ImageService } from '../../../services/image.service';
import { MessageComponent } from '../../../pop-up/message/message.component';
import { SuccessComponent } from '../../../pop-up/success/success.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.scss'],
})
export class AddItemsComponent implements OnInit {
  ngOnInit(): void {
    this.items.push({
      name: '',
      price: '',
      quantity: '',
      description: '',
      imageUrl: '',
      files: [],
      file: this.file,
      showDiv: false,
    });
  }
  constructor(
    private http: ProductService,
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
    price: any;
    quantity: any;
    description: any;
    imageUrl: any;
    files: File[];
    file: File;
    showDiv: boolean;
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
      price: '',
      quantity: '',
      description: '',
      imageUrl: '',
      files: [],
      file: this.file,
      showDiv: false,
    });
  }

  removeItems(i: any) {
    this.items.splice(i, 1);
  }
  message: any;
  isValidImage = false;
  addItems(form: NgForm) {
    if (this.valid() == true) {
      type itemsList = Array<{
        name: string;
        price: string;
        quantity: string;
        description: string;
        imageUrl: string;
      }>;
      const myItemsList: itemsList = [];
      for (let item of this.items) {
        if (item.file) {
          myItemsList.push({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            description: item.description,
            imageUrl: item.name + ' ' + item.imageUrl,
          });
        }
      }
      console.log(myItemsList);

      this.http.createListProduct(myItemsList).subscribe((data) => {
        for (let value of this.items) {
          this.file = value.file;
          const path = 'items/' + value.name + ' ' + this.file.name;
          const fileRef = this.storage.ref(path);
          this.storage.upload(path, this.file);
        }
        console.log(data);
        console.log('success');
        this.items = [
          {
            name: '',
            price: '',
            quantity: '',
            description: '',
            imageUrl: '',
            files: [],
            file: this.file,
            showDiv: false,
          },
        ];
        form.resetForm();
        this.message = 'Tạo sản phẩm thành công';
        this.openDialogSuccess();
      });
    } else this.openDialogMessage();
  }

  public valid() {
    for (let item of this.items) {
      if (!item.file) {
        console.log('kh co anh');
        this.message = 'Xin nhập ảnh sản phẩm vào';
        return;
      }

    }
    for(let i =0 ; i < this.items.length; i++){
      for(let j = i+1 ; j<= this.items.length ; ){
        if(this.items[i].name == this.items[j].name){
          this.message = "Tên sản phẩm " + this.items[j].name+" bị trùng với " + this.items[i].name ;
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
}
