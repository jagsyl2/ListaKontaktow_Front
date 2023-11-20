import { Component, OnInit } from '@angular/core';
import { Person } from '../models/person';
import { ContactListService } from '../contact-list.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  public display: boolean = false;
  selectedPerson: any;
  
  People: Array<Person> = [];

  constructor(private contactListService: ContactListService) {
    this.updateContactList();
   }

  ngOnInit(): void {
  }

  updateContactList() {
    this.contactListService.getContactList().subscribe({
      next: (response) => this.People = response,
      error: () => console.error("Error: Not able to get contact list")
    })
  }

  public displayDetails(person: any): void {
    this.display = !this.display;
    this.selectedPerson = person;
  }
}
