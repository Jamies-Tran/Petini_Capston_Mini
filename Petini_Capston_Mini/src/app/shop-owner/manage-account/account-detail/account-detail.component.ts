import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent {

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
  hidePassword = true;
  hideConfirmPass = true;
  message: any;
  value: any;

  constructor(private http : UserService){
    const currentYear = new Date().getFullYear();
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    this.minDate = new Date(currentYear - 100, 0, 0);
    this.maxDate = new Date(currentDate);
  }
  ngOnInit(){

    try {
      let name = localStorage.getItem('usernameSelector') as string;
      this.http.getUserByName(name).subscribe(
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

        }
      );
    } catch {}
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
