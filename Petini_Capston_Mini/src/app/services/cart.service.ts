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
export class CartService {
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
  // /api/cart/       getCart
  public getCustomerShoppingCart() {
    // headers
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    console.log(this.httpOptions.headers);
    const url = `${this.REST_API_SERVER}/api/cart/`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //  2 PUT
  //  /api/cart/   addToCart
  public addProductToShoppingCart(productName: string, quantity: number) {
    // headers
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    console.log(this.httpOptions.headers);
    const url = `${this.REST_API_SERVER}/api/cart/?productName=${productName}&quantity=${quantity}`;

    return this.httpClient
      .put<any>(url, null, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
