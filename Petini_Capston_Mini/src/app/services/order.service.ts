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
export class OrderService {
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
  // /api/order/all-orders
  public getAllOrders() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    console.log(this.httpOptions.headers);
    const url = `${this.REST_API_SERVER}/api/order/all-orders`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 2 GET
  // /api/order/customer-orders
  public getAllOrderOfCustomer(username: string) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    console.log(this.httpOptions.headers);
    const url = `${this.REST_API_SERVER}/api/order/customer-orders?username=${{
      username,
    }}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 3 POST
  // /api/order/new-order
  public createOrder() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };

    const url = `${this.REST_API_SERVER}/api/order/new-order`;
    return this.httpClient
      .post<any>(url, null, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 4 PUT
  // /api/order/order-accepting
  public acceptOrder(id: number) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const url = `${this.REST_API_SERVER}/api/order/order-accepting?id=${{
      id,
    }}`;
    return this.httpClient
      .put<any>(url, null, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 5 PUT
  // /api/order/order-rejecting
  public rejectOrder(id: number) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const url = `${this.REST_API_SERVER}/api/order/order-rejecting?id=${{
      id,
    }}`;
    return this.httpClient
      .put<any>(url, null, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 6 GET
  // /api/order/status-orders
  public updateProduct(
    id: number,
    description: string,
    imageUrl: string,
    name: string,
    price: number,
    quantity: string,
    status: string
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    var value = {
      description: description,
      imageUrl: imageUrl,
      name: name,
      price: price,
      quantity: quantity,
      status: status,
    };
    const url = `${
      this.REST_API_SERVER
    }/api/product/product-update?productName=${{ id }}`;
    return this.httpClient
      .put<any>(url, value, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
