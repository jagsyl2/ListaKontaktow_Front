import { Component, OnInit } from '@angular/core';
import { ContactListService } from '../contact-list.service';

@Component({
  selector: 'app-delete-contact',
  templateUrl: './delete-contact.component.html',
  styleUrls: ['./delete-contact.component.css']
})
export class DeleteContactComponent implements OnInit {
  inputValue: string = '';
  numbervalue: number = 0;

  constructor(private contactListService: ContactListService) { }

  ngOnInit(): void {
  }

  deleteUser(id: string)
  {  this.numbervalue = parseInt(id)

    if (isNaN(this.numbervalue)) {
    console.log("Wrong input");
  } else {
    this.contactListService.removePerson(this.numbervalue).subscribe({
      next: (response) => {
        console.log("Person has been removed");
      }
    })
  }
  }
}
