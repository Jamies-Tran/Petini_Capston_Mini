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
export class AfterCareService {
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
  // /api/after-care/allow-all/info
  public getServiceDetail(name: string) {
    // headers
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    console.log(this.httpOptions.headers);
    const url = `${this.REST_API_SERVER}/api/after-care/allow-all/info?name=${name}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 2 GET
  // /api/after-care/allow-all/service-list
  public getServiceList() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        // Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    console.log(this.httpOptions.headers);
    const url = `${this.REST_API_SERVER}/api/after-care/allow-all/service-list`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 3 DELETE
  // /api/after-care/delete-service
  public deleteService(serviceName: string) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    console.log(this.httpOptions.headers);
    const url = `${this.REST_API_SERVER}/api/after-care/delete-service?serviceName=${serviceName}`;
    return this.httpClient
      .delete<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 4 POST
  // /api/after-care/new-service
  public createService(
    afterCareWorkingSchedules: Array<any>,
    description:string,
    imageUrl:string,
    name: string,
    price: string
  ) {
    var value = {
      afterCareWorkingSchedules,
      description,
      imageUrl,
      name,
      price,
    };

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };

    const url = `${this.REST_API_SERVER}/api/after-care/new-service`;
    return this.httpClient
      .post<any>(url, value, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 5 PUT
  // /api/after-care/update-service
  public updateService(
    afterCareWorkingHours: Array<any>,
    name: string,
    price: string
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };

    var value = {
      afterCareWorkingHours,
      name,
      price,
    };

    const url = `${this.REST_API_SERVER}/api/after-care/update-service`;

    return this.httpClient
      .put<any>(url, value, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
