import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private REST_API_SERVER = 'http://localhost:8080';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private httpClient: HttpClient) {}
  private handleError(error: HttpErrorResponse) {
    return throwError(error.error['message']);
  }

  // this.httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
  //   }),
  // };


  // 1 POST
  // /api/user/customer-register
  public registerCustomerAccount(
    address: string,
    dob: string,
    email: string,
    password: string,
    phone: string,
    username: string
  ) {
    var value = {
      address,
      dob,
      email,
      password,
      phone,
      username,
    };
    console.log('value:', value);
    const url = `${this.REST_API_SERVER}/api/user/customer-register`;
    console.log(url);
    return this.httpClient
      .post<any>(url, value, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 2 GET
  // /api/user/info
  public getUserInfo() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    let username = localStorage.getItem('username')
    console.log(this.httpOptions.headers);
    const url = `${this.REST_API_SERVER}/api/user/info?username=${username}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 3 POST
  // /api/user/login
  public login(username: string, password: string) {
    var value = {
      password,
      username,
    };
    console.log(value);
    const url = `${this.REST_API_SERVER}/api/user/login`;
    return this.httpClient
      .post<any>(url, value, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 4 POST
  // /api/user/owner-register
  public registerShopOwnerAccount(
    address: string,
    dob: string,
    email: string,
    password: string,
    phone: string,
    username: string
  ) {
    var value = {
      address,
      dob,
      email,
      password,
      phone,
      username
    };
    const url = `${this.REST_API_SERVER}/api/user/owner-register`;
    console.log(url);
    return this.httpClient
      .post<any>(url, value, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 5 GET
  // /api/user/user-list
  public getUserListByTypeAndStatus(type: string) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const url = `${this.REST_API_SERVER}/api/user/user-list?type=${type}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 6 PUT
  // /api/user/user-update
  public updateUser (
    address:string,
    dob:string,
    email:string,
    password:string,
    phone:string,
    username:string
  ){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    var value = {
      address,
      dob,
      email,
      password,
      phone,
      username
    }
    const url = `${this.REST_API_SERVER}/api/user/user-update?username=${username}`;
    return this.httpClient
      .put<any>(url,value, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
