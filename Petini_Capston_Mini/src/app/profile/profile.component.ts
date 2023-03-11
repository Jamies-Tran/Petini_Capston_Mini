import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MessageComponent } from '../pop-up/message/message.component';
import { SuccessComponent } from '../pop-up/success/success.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  id: any;
  username: any;
  email!: string;
  status: any;
  avatarUrl: any;
  phone: any;
  dob: any;
  address!: string;
  minDate!: Date;
  maxDate!: Date;
  password: any;
  confirmPassword: any;

  constructor(private http: UserService, public dialog: MatDialog) {
    const currentYear = new Date().getFullYear();
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    this.minDate = new Date(currentYear - 100, 0, 0);
    this.maxDate = new Date(currentDate);
  }

  ngOnInit(): void {
    this.getProfile();
    try {
      this.http.getUserInfo().subscribe(
        (data) => {
          console.log(data);
          this.value = data;
          this.username = data['username'];
          this.email = data['email'];
          this.phone = data['phone'];
          this.dob = data['dob'];
          this.address = data['address'];
        },
        (error) => {
          this.message = error;
          this.openDialogMessage();
        }
      );
    } catch {}
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
  hidePassword = true;
  hideConfirmPass = true;
  message: any;
  value: any;
  getProfile() {
    this.http.getUserInfo().subscribe((data) => {
      console.log(data);
      this.username = data['username'];
      this.email = data['email'];
      this.phone = data['phone'];
      this.dob = data['dob'];
      this.address = data['address'];
    });
  }
  isUpdate = false;
  updateAccount() {
    this.valid();
    if (this.isValid) {
      this.convert(this.dob);
      this.http
        .updateUser(
          this.address,
          this.dob,
          this.email,
          this.password,
          this.phone,
          this.username
        )
        .subscribe(
          (data) => {
            this.message = ' Chỉnh sửa thành công';
            this.openDialogSuccess();
            location.reload();
          },
          (error) => {
            this.message = error.message;
            this.openDialogMessage();
          }
        );
    }
  }
  filter = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  filterPhone = /^[0]\d{9,12}$/;
  validMail: boolean = true;
  validPhone: boolean = true;
  public valid() {
    this.validMail = this.filter.test(this.email + '');
    this.validPhone = this.filterPhone.test(this.phone + '');
    if (this.username == '') {
      this.username = this.value.username;
    } else if (this.address == '') {
      this.address = this.value.address;
    } else if (this.dob == '') {
      this.dob = this.value.dob;
    } else if (this.email == '') {
      this.email = this.value.quantity;
    } else if (this.phone == '') {
      this.phone = this.value.phone;
    } else if (
      this.password != '' &&
      this.confirmPassword != '' &&
      this.password != this.confirmPassword
    ) {
      this.message = 'Xin kiểm tra lại mật khẩu';
      this.openDialogMessage();
      this.isValid = false;
    } else if (this.validMail == false) {
      this.message = 'Email không hợp lệ';
      this.isValid = false;
      this.openDialogMessage();
    } else if (this.validPhone == false) {
      this.message = 'Phone không hợp lệ';
      this.isValid = false;
      this.openDialogMessage();
    } else if (!this.password) {
      this.password = localStorage.getItem('password') as string;
      this.isValid = true;
    } else this.isValid = true;
  }
  isValid!: boolean;

  convert(event: any): void {
    console.log(event);
    var date = new Date(event),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    this.dob = [date.getFullYear(), mnth, day].join('-');
    console.log('convert', this.dob);
  }
}
