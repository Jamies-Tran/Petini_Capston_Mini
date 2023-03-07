import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessComponent } from '../pop-up/success/success.component';
import { MessageComponent } from '../pop-up/message/message.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  minDate!: Date;
  maxDate!: Date;
  hidePassword = true;
  hideConfirmPass = true;
  passwordFormControl = new FormControl('', [Validators.required]);
  confirmPasswordFormControl = new FormControl('', [Validators.required]);
  usernameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  addressFormControl = new FormControl('', [Validators.required]);
  phoneFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  dobFormControl = new FormControl('', [Validators.required]);

  public dob = '';
  convert(event: any): void {
    console.log(event);
    var date = new Date(event),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
      this.dob = [date.getFullYear(), mnth, day].join('-')
    this.dobFormControl.setValue(this.dob);
    console.log('convert', this.dobFormControl.value);
  }

  filter = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  validMail: boolean = true;
  getEmailErrorMessage() {
    this.validMail = this.filter.test(this.emailFormControl.value + '');
    if (this.emailFormControl.hasError('required')) {
      return 'You must enter a <strong> value </strong>';
    }

    if (this.validMail === false) {
      return 'Not a valid <strong>email</strong>';
      console.log(this.passwordFormControl.value);
      console.log(this.confirmPasswordFormControl.value);
    } else {
      console.log(this.passwordFormControl.value);
      console.log(this.confirmPasswordFormControl.value);
      return '';
    }
  }




  constructor(
    private http: RegisterService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public datepipe: DatePipe,
  ) {
    const currentYear = new Date().getFullYear();
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    this.minDate = new Date(currentYear - 100, 0, 0);
    this.maxDate = new Date(currentDate);
  }

  isLogin: any;
  ngOnInit(): void {
    if (localStorage.getItem('userToken')) {
      this.isLogin = true;
      console.log('true', this.isLogin);
    } else {
      this.isLogin = false;
      console.log('false:', this.isLogin);
    }
  }

  message: any;
  openDialogSuccess() {
    localStorage.setItem('registerSuccess', '');

    const timeout = 3000;
    const dialogRef = this.dialog.open(SuccessComponent, {
      data: this.message,
    });
    dialogRef.afterOpened().subscribe((_) => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout);
    });
  }

  openDialogMessage() {
    this.dialog.open(MessageComponent, {
      data: this.message,
    });
  }
  logout() {
    localStorage.clear();
    this.isLogin = false;
    this.router.navigate(['Login'], { relativeTo: this.route });
  }

  // Register Owner
  // protected registerOwner() {
  //   this.http
  //     .registerOwner(
  //       this.addressFormControl.value + '',
  //       this.dobFormControl.value + '',
  //       this.emailFormControl.value + '',
  //       this.passwordFormControl.value + '',
  //       this.phoneFormControl.value + '',
  //       this.usernameFormControl.value + ''
  //     )
  //     .subscribe((data) => {
  //       console.log('Succes', data);
  //       localStorage.setItem('registerSuccess', 'true');
  //             this.router.navigate(['/Login'], { relativeTo: this.route });
  //     });
  // }
  // Register Customer
  protected register(form: NgForm) {
    console.log(this.passwordFormControl.value);
    console.log(this.confirmPasswordFormControl.value);
    if (
      this.confirmPasswordFormControl.value != this.passwordFormControl.value
    ) {
      console.log('true');
    }
    this.convert(this.dobFormControl.value);
    if (this.valid() == true) {

      this.http
        .registerCustomer(
          this.addressFormControl.value + '',
          this.dobFormControl.value + '',
          this.emailFormControl.value + '',
          this.passwordFormControl.value + '',
          this.phoneFormControl.value + '',
          this.usernameFormControl.value + ''
        )
        .subscribe((data) => {
          console.log('Success', data);
          localStorage.setItem('message', 'Register Success');
          localStorage.setItem('registerSuccess', 'true');
          this.message = 'Register Success';
          this.openDialogSuccess();
          this.router.navigate(['/Login'], { relativeTo: this.route });
        },error =>{
          // this.Result = "Check your information!!!!"
          if(error['status'] == 500){
            this.message = "Username has exist"
          }else{
          console.log(error.message);
          this.message = error.message;
          this.openDialogMessage();}
        });
    }else{
      this.openDialogMessage();
    }
  }
  isConfirmPass:any;
  public valid() {
    this.isConfirmPass = '';
    this.validMail = this.filter.test(this.emailFormControl.value+"");
    if (this.usernameFormControl.value == '') {

      return;
    } else if (this.addressFormControl.value == '') {

      return;
    } else if (this.dobFormControl.value == '') {

      return;
    }  else if (this.phoneFormControl.value == '') {

      return;
    }
     else if (this.passwordFormControl.value != this.confirmPasswordFormControl.value) {
      this.message = "Check confirm password"
      return;
    }else if(this.passwordFormControl.value == ''){
      this.message = "Please enter your password"
      return;
    }
    else if (this.validMail == false) {
      this.message = "Incorrect Email"
      return;
    }

     else return true;
  }
}
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
