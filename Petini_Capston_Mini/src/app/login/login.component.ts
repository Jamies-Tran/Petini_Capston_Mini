import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';
import { SuccessComponent } from '../pop-up/success/success.component';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../pop-up/message/message.component';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  passwordFormControl = new FormControl('', [Validators.required]);
  usernameFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  message: any;
  constructor(
    private http: UserService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem('registerSuccess') === 'true') {
      this.message = localStorage.getItem('message');
      this.openDialogSuccess();
    }
    if (localStorage.getItem('userToken')) {
      this.isLogin = true;
      console.log('true', this.isLogin);
      if (localStorage.getItem('roles') === 'CUSTOMER') {
        this.router.navigate(['/'], { relativeTo: this.route });
      } else if (localStorage.getItem('roles') === 'SHOPOWNER') {
        this.router.navigate(['/ShopOwner'], { relativeTo: this.route });
      }
    } else {
      this.isLogin = false;
      console.log('false:', this.isLogin);
    }
  }

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

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  isLogin: any;
  logout() {
    localStorage.clear();
    this.isLogin = false;
    this.router.navigate(['Login'], { relativeTo: this.route });
  }

  protected login() {
    this.http
      .login(
        this.usernameFormControl.value + '',
        this.passwordFormControl.value + ''
      )
      .subscribe((data) => {
        localStorage.setItem('userToken', data['token']);
        localStorage.setItem('username', data['username']);
        localStorage.setItem('roles', data['role']);
        localStorage.setItem('password', this.passwordFormControl.value as string);
        this.updateData = 'true';
        this.updateDataEvent.emit(this.updateData);
        console.log(this.updateDataEvent);
        console.log(data);
        console.log(data['role']);
        if (data['role'] === 'CUSTOMER') {
          this.router.navigate(['/'], { relativeTo: this.route });
        } else if (data['role'] === 'SHOPOWNER') {
          this.router.navigate(['/ShopOwner'], { relativeTo: this.route });
        }
      }
      ,error =>{
        // this.Result = "Check your information!!!!"

        console.log(error.message);
        this.message = "The Username or Password is Incorrect";
        this.openDialogMessage();
      });
  }

  @Output() updateDataEvent = new EventEmitter<string>();
  updateData = '';
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
