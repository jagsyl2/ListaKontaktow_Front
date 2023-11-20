import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  base_url = 'http://localhost:10500/api/login'
  logged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { }

  getLogged() {
    return this.logged.asObservable();
  }
  
  checkEmail(email: string) {
    return this.httpClient.get(this.base_url + `/verify?email=${email}`);
  }

  checkPassword(password: string) {
    return this.httpClient.get(this.base_url + `/varifypassword?password=${password}`);
  }

  logIn(email: string, password: string) {
    return this.httpClient.get<boolean>(this.base_url + `/find?email=${email}&password=${password}`);
  }

  // getContactList() {
  //   return this.httpClient.get<Array<Person>>(this.base_url);
  // }

  // removePerson(id: number) {
  //   return this.httpClient.delete(this.base_url + id);
  // }

  sendUser(user: User) {
    let header = new HttpHeaders({'content-type': 'application/json'})
    return this.httpClient.post(this.base_url, user, {headers: header})
  }
}
