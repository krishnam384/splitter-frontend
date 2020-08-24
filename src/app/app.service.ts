import { Injectable } from '@angular/core';
import { Observable,Subscription, observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse , HttpParams } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url = "https://chatapi.edwisor.com";
  private username: string;

  constructor(public http: HttpClient) { }

  public getUserInfoFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  public setUserInfoInLocalStorage = (data) => {
    localStorage.setItem('userInfo',JSON.stringify(data));
  }

  public setUsername(data){
    this.username = data;
    
  }

  public getCountryCode(){
    return this.http.get('http://localhost:8000/api/v1/users/phoneId');
  }

  public getUsername(){
    return this.username;
  }

  public getAllGroups(data){
    let response = this.http.get(`http://localhost:8000/api/v1/groups/user/${data}`);
    return response;
  }

  public signupFunction(data): Observable<any> {
    console.log(data);
    const params = new HttpParams()
      .set('username', data.username)
      .set('lastName', data.lastName)
      .set('phone', data.phone)
      .set('email', data.email)
      .set('password', data.password);

      let response = this.http.post(`http://localhost:8000/api/v1/users/signup`, params);
      console.log(response);
      return response;
  }//end of signup function

  public signinFunction(data): Observable<any> {
    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);

      let response = this.http.post(`http://localhost:8000/api/v1/users/login`, params);
      console.log(response);
      return response;
  }//end of signin function

  public createaGroup(data): Observable<any> {


    let response = this.http.post('http://localhost:8000/api/v1/groups/createGroup', data);
    return response;
    
  }

  public getGroup(id): Observable<any> {
    let response = this.http.get(`http://localhost:8000/api/v1/groups/${id}`);
    return response;
  }

  public findMember(data): Observable<any> {
    const params = new HttpParams()
    .set('username',data.addMembers);
    let response = this.http.post(`http://localhost:8000/api/v1/users/getUser`,params);
    return response;
  }

  public getMemberFromUsers(data): Observable<any> {
    let id = data;
    let response = this.http.get(`http://localhost:8000/api/:id`);
    return response;
  }

  public createBill(data): Observable<any> {
    let response = this.http.post('http://localhost:8000/api/v1/bills/createBill',data);
    return response;
  }

  public getBills(data): Observable<any> {
    console.log(data);
    let response = this.http.get(`http://localhost:8000/api/v1/bills/${data}`);
    return response;
  }

  public logout(): Observable<any> {

    const params = new HttpParams()
      .set('authToken', Cookie.get('authtoken'))

    return this.http.post(`http://localhost:8000/api/v1/users/logout`, params);

  } // end logout function
}
