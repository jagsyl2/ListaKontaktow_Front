import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from './models/person';

@Injectable({
  providedIn: 'root'
})
export class ContactListService {

  base_url = 'http://localhost:10500/api/persons'

  constructor(private httpClient: HttpClient) { }

  getContactList() {
    return this.httpClient.get<Array<Person>>(this.base_url);
  }

  removePerson(id: number) {
    return this.httpClient.delete(this.base_url + '/' + id);
  }

  sendPerson(person: Person) {
    let header = new HttpHeaders({'content-type': 'application/json'})
    return this.httpClient.post(this.base_url, person, {headers: header})
  }
}
