import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../../pop-up/message/message.component';
import { SuccessComponent } from '../../pop-up/success/success.component';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss'],
})
export class ManageAccountComponent implements OnInit {
  valuesCustomer: any=[];
  valuesOwner: any =[];
  message!: string;

  constructor(public dialog: MatDialog , private http: UserService) {}
  ngOnInit(): void {
    this.http.getUserListByTypeAndStatus('CUSTOMER').subscribe((data) =>{
      console.log(data);
      this.valuesCustomer = data;
      console.log(this.valuesCustomer);
    },
    (error) =>{
      this.message = error;

    });
    this.http.getUserListByTypeAndStatus('OWNER').subscribe((data) =>{
      console.log(data);
      this.valuesOwner = data;
      console.log(this.valuesOwner);
    },
    (error) =>{
      this.message = error;
    });
  }

  title = 'pagination';
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;

  // Customer
  onTableDataChangeCustomer(event: any) {
    this.page = event;
    this.valuesCustomer;
  }

  // Owner
  onTableDataChangeOwner(event: any) {
    this.page = event;
    this.valuesOwner;
  }

  public onItemSelector(id: number, username: string) {
    localStorage.setItem('id', id + '');
    localStorage.setItem('usernameSelector', username);
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
  openDialogAction(){}
  accept(){}
  reject(){}
}

export interface data {
  id: number;
  username: string;
  email: string;
  status: string;
  avatarUrl:string;
  phone:string;
}
