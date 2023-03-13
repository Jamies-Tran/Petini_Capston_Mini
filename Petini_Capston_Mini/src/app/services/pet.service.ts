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
export class PetService {

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
  // /api/pet/allow-all/pet-detail?name=
  public getPetByName(name:string){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        // 'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    // get API
    const url = `${this.REST_API_SERVER}/api/pet/allow-all/pet-detail?name=${name}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 2 GET
  // /api/pet/allow-all/pets-age
  public getPetListByAgeRange(ageFrom:number,ageTo:number){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        // 'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    // get API
    const url = `${this.REST_API_SERVER}api/pet/allow-all/pets-age?ageFrom=${ageFrom}&ageTo=${ageTo}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 3 GET
  // /api/pet/allow-all/pets-color
  public getPetListByColor(color:string){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        // 'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    // get API
    const url = `${this.REST_API_SERVER}/api/pet/allow-all/pets-color?color=${color}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 4 GET
  // /api/pet/allow-all/pets-status
  public getPetListByStatus(status:string){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        // 'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    // get API
    const url = `${this.REST_API_SERVER}/api/pet/allow-all/pets-status?status=${status}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 5
  // /api/pet/allow-all/pets-type
  public getPetListByType(type:string){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        // 'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    // get API
    const url = `${this.REST_API_SERVER}/api/pet/allow-all/pets-type?type=${type}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // 6
  // /api/pet/new-pet POST
  public createPetList(petRequestList:Array<any> ){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
      }),
    };
    // get API
    var value =petRequestList  ;
    const url = `${this.REST_API_SERVER}/api/pet/new-pet`;
    return this.httpClient
      .post<any>(url,value, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
