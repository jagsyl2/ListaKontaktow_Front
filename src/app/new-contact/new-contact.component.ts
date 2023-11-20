import { Component, OnInit, Output } from '@angular/core';
import { ContactListService } from '../contact-list.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Person } from '../models/person';
import { LoginService } from '../login.service';
import { CategoryService } from '../category.service';
import { Subcategory } from '../models/subcategory';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})
export class NewContactComponent implements OnInit {
  categories!: any[];
  subcategories!: Subcategory[];
  categoryId: number = 0;
  subcategoryName: string ='';
  birthDate: Date = new Date();

  constructor(private contactListService: ContactListService,
    private loginService: LoginService,
    private categoryService: CategoryService,
     private formBuilder: FormBuilder) {
      this.categoryService.getCategoriesList().subscribe((data: any[]) => {
        this.categories = data;
      })
     }

  ngOnInit(): void {
    this.categoryService.getCategoriesList().subscribe((data: any[]) => {
      this.categories = data;
    }),
    this.loadSubcategories(this.categoryId);
  }

  chooseCategory(id: number) {
    if (id !== null) {
      this.categoryId = id;
      this.loadSubcategories(this.categoryId);
    }
  }

  loadSubcategories(categoryId: number) {
    this.categoryService.getSubcategoriesListById(categoryId).subscribe((data: any[]) => {
      this.subcategories = data;
    })
  }

  contactForm = this.formBuilder.group({
    name: ['', {
      validators: [
        Validators.required
      ],
      updateOn: 'blur'
    }],
    surname: ['', {
      validators: [
        Validators.required
      ],
      updateOn: 'blur'
    }],
    email: ['', {
      validators: [
        Validators.required
      ],
      updateOn: 'blur'
    }],
    password: ['', {
      validators: [
        Validators.required
      ],
      updateOn: 'blur'
    }]
  })

  validation_messages = {
    'name': [
      {type:'required', message: 'Imię jest wymagane'}
    ],
    'surname': [
      {type:'required', message: 'Nazwisko jest wymagane'}
    ],
    'email': [
      {type:'required', message: 'Email jest wymagany'}
    ],
    'password': [
      {type:'required', message: 'Hasło jest wymagane'}
    ],
  }

  get name() { return this.contactForm.get('name'); }
  get surname() { return this.contactForm.get('surname'); }
  get email() { return this.contactForm.get('email'); }
  get password() { return this.contactForm.get('password'); }
  get category() { return this.contactForm.get('category'); }
  get subcategory() { return this.contactForm.get('subcategory'); }
  get phoneNumber() { return this.contactForm.get('phoneNumber'); }

  submitNewContactForm(){
    const email = this.email?.value;
    const password = this.password?.value;

    if(this.contactForm.valid){
      if (this.loginService.checkEmail(email).subscribe((response: any) => {
        if (response.errorMessage) {
          console.log(response.errorMessage);
        } else {
            this.loginService.checkPassword(password).subscribe((response: any) => {
              if (response.errorMessage) {
                console.log(response.errorMessage);
              } else {
                  this.loginService.sendUser(this.convertToPersonForm()).subscribe({
                    next: (response) => {
                      this.contactForm.reset();
                    }
                  });
              }});
          }})) {
        this.contactListService.sendPerson(this.convertToPersonForm()).subscribe({
          next: (response) => {
            this.contactForm.reset();
          }
        })}
    } else {
      console.error("Form not valid")
    }
  }

  private convertToPersonForm() {
    return {
      name: this.name?.value,
      surname: this.surname?.value,
      email: this.email?.value,
      password: this.password?.value,
      categoryId: this.category?.value,
      subcategory: this.subcategory?.value,
      phoneNumber: this.phoneNumber?.value,
      BirthDate: this.birthDate
    } as Person;
  }
}

