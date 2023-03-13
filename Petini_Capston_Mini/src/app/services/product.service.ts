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
export class ProductService {
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

  // 1 POST
  // /api/product/add-list          addItems
  public createListProduct(products: Array<any>) {
    var value = {
      products,
    };
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    const url = `${this.REST_API_SERVER}/api/product/add-list`;
    return this.httpClient
      .post<any>(url, value, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 2 GET
  // /api/product/detail              getItem
  public getProductDetail(name: string) {
    // headers
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        // 'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    // get API
    const url = `${this.REST_API_SERVER}/api/product/detail?name=${name}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 3 GET
  // /api/product/list              getListItems
  public getProductList() {
    // headers
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    // get API
    const url = `${this.REST_API_SERVER}/api/product/list`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 4 PUT
  // /api/product/product-update
  public updateProduct(
    description: string,
    imageUrl: string,
    name: string,
    price: string,
    quantity: string,
    status: string,
    productName:string

  ) {
    // headers
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    // get API
    const url = `${this.REST_API_SERVER}/api/product/product-update?productName=${productName}`;

    var value = {
      description,
      imageUrl,
      name,
      price,
      quantity,
      status,
    };
    return this.httpClient
      .put<any>(url, value, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
