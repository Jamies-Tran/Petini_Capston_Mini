import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../../services/image.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../../../pop-up/message/message.component';
import { SuccessComponent } from '../../../pop-up/success/success.component';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, ref } from 'firebase/storage';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})
export class ItemDetailComponent implements OnInit {

  ngOnInit(): void {
    try {
      let name = localStorage.getItem('getItemsName') as string;
      console.log(name);

      this.http.getProductDetail(name).subscribe(
        async (data) => {
          console.log(data);
          this.value = data;
          this.name = data['name'];
          this.description = data['description'];
          this.status = data['status'];
          this.quantity = data['quantity'];
          this.price = data['price'];

          // get file image
          await this.image
            .getImage('items/' + data['imageUrl'])
            .then((url) => {
              this.imageUrl = url;
              this.validUrl = false;
            })
            .catch((error) => {
              this.validUrl = true;
            });
          console.log(this.imageUrl);
        },
        (error) => {
          this.message = error.message;
          this.openDialogMessage();
        }
      );
    } catch (error) {}
  }
  constructor(
    private image: ImageService,
    public dialog: MatDialog,
    private http: ProductService,
    private storage: AngularFireStorage
  ) {}

  message!: string;
  isUpdate = false;
  name!: string;

  description!: string;
  status = '';
  imageUrl!: string;
  quantity!: string;
  price!: string;
  validUrl = false;
  isUpdateImage = false;
  value: any;

  updateItems() {
    this.valid();

    this.http
      .updateProduct(
        this.description,
        this.imageUrl,
        this.name,
        this.price,
        this.quantity,
        this.status,
        this.value.name

      )
      .subscribe(
        (data) => {
          for ( this.file of this.files) {

            const path = 'items/' + this.value.name + ' ' + this.file.name;
            const fileRef = this.storage.ref(path);
            this.storage.upload(path, this.file);
          }
          localStorage.setItem('getItemsName' , this.name);
          this.message = 'Thành công';
          this.openDialogSuccess();
          location.reload();
        },
        (error) => {
          this.message = error.message;
          this.openDialogMessage();
        }
      );
  }
  valid() {
    if (this.name == '') {
      this.name = this.value.name;
    } else if (this.description == '') {
      this.description = this.value.description;
    } else if (this.price == '') {
      this.price = this.value.price;
    } else if (this.quantity == '') {
      this.quantity = this.value.quantity;
    } else if (this.showReview) {
      this.imageUrl = this.name + ' ' + this.itemFile.name;
    } else if (!this.showReview) {
      this.imageUrl = this.value.imageUrl;
    }
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

  files: File[] = [];
  file!: File;
  itemFile!: File;
  showReview = false;
  onSelect(files: any) {
    console.log(event);
    this.files.push(...files.addedFiles);
    for (this.file of this.files) {
      this.itemFile = this.file;
      console.log(this.itemFile);
    }
    if (this.files.length >= 1) {
      this.showReview = true;
    }
  }

  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    if (this.files.length >= 1) {
      this.showReview = true;
    } else {
      this.itemFile;
      this.showReview = false;
    }
  }
  updateImage() {
    console.log('is update', this.isUpdate);
    console.log('is update image', this.isUpdateImage);
    console.log('is valid url', this.validUrl);
    if (!this.validUrl && this.isUpdate) {
      this.isUpdateImage = true;
    } else {
      this.isUpdateImage = false;
    }
  }
  fixImage() {
    if (this.validUrl) {
      this.isUpdateImage = true;
    } else {
      this.isUpdateImage = false;
    }
  }
}
