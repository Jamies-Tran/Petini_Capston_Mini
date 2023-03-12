import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private REST_API_SERVER = 'http://localhost:8080';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
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

  // 1 GET
  // /api/booking/all
  public getAllBooking(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    console.log(this.httpOptions.headers);
    const url = `${this.REST_API_SERVER}/api/booking/all`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 2 GET
  // /api/booking/date-validation
  public checkValidBooking(timeLabel:string){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    console.log(this.httpOptions.headers);
    const url = `${this.REST_API_SERVER}/api/booking/date-validation?timeLabel=${timeLabel}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 3 GET
  // /api/booking/detail-id
  public getBookingById(id:number){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    console.log(this.httpOptions.headers);
    const url = `${this.REST_API_SERVER}/api/booking/detail-id?id=${id}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 4 GET
  // /api/booking/list-customer
  public getCustomerBookingList(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    console.log(this.httpOptions.headers);
    const url = `${this.REST_API_SERVER}/api/booking/list-customer`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 5 GET
  // /api/booking/list-status
  public   getBookingListByStatus(status:string){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    console.log(this.httpOptions.headers);
    const url = `${this.REST_API_SERVER}/api/booking/list-status?status=${status}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 6 POST
  // /api/booking/new-booking
  public createServiceBooking(serviceName:string ,timeLabel:Array<string>){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    let value:Array<any>=[];
    let afterCareRequestDtos:afterCareRequestDtos;
    afterCareRequestDtos={serviceName:serviceName ,timeLabel:["12:00","13:00"] };

     value=[{serviceName:serviceName,timeLabel:timeLabel} ];
    console.log(value);
    const url = `${this.REST_API_SERVER}/api/booking/new-booking`;
    return this.httpClient
      .post<any>(url,value,this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
export class afterCareRequestDtos{
  serviceName!:string ;
  timeLabel!:Array<string>;
}
