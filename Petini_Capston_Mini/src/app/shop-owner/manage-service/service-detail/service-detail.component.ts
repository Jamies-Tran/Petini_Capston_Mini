import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss'],
})
export class ServiceDetailComponent {
  form!: NgForm;
  name:any;
  price:any;
  description:any
  file!:File ;
  files: File[] = [];
  showReview = false;
  onRemove(event: File) {

    // console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.showReview = false;
    // this.imageUrl = '';
    // console.log(this.imageUrl);
    // console.log('files lenght: ', this.files.length);
    // if (this.files.length >= 1) {
    //   this.showDiv = false;
    // } else {
    //   this.showDiv = true;
    // }
  }

  onSelect(files: any) {
    this.files.push(...files.addedFiles);
    for (this.file of this.files) {
this.showReview=true;
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


}
