import { Component, OnInit, Inject } from '@angular/core';
import { MyErrorStateMatcher } from '../register/register.component';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../pop-up/message/message.component';
import { SuccessComponent } from '../pop-up/success/success.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})



export class TestComponent  {
  message: any;

  constructor(

    public dialog: MatDialog,

  ) {}

  deleteHomestay() {}
  openDialog() {
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


