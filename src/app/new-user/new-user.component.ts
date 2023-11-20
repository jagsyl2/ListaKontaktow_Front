import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  constructor(private loginService: LoginService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  userForm = this.formBuilder.group({
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
    'email': [
      {type:'required', message: 'Email jest wymagany'}
    ],
    'password': [
      {type:'required', message: 'Hasło jest wymagane'}
    ],
  }

  get email() { return this.userForm.get('email'); }
  get password() { return this.userForm.get('password'); }

  submitNewUserForm(){
    const email = this.email?.value;
    const password = this.password?.value;

    if(this.userForm.valid){
      this.loginService.checkEmail(email).subscribe((response: any) => {
        if (response.errorMessage) {
          console.log(response.errorMessage);
        } else {
            this.loginService.checkPassword(password).subscribe((response: any) => {
              if (response.errorMessage) {
                console.log(response.errorMessage);
              } else {
                  this.loginService.sendUser(this.convertToUserForm()).subscribe({
                    next: (response) => {
                      this.userForm.reset();
                    }
                  });
              }});
          }});
    } else {
      console.error("Form not valid")
    }
  }

  private convertToUserForm() {
    return {
      email: this.email?.value,
      password: this.password?.value
    } as User;
  }
}
