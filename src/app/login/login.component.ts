import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private loginService: LoginService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  loginForm = this.formBuilder.group({
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

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  submitLoginForm(){
    const email = this.email?.value;
    const password = this.password?.value;

    this.loginService.logIn(email, password).subscribe((loggedIn: boolean) => {
      this.loginService.logged.next(loggedIn);
      });
    };

    logOut() {
      this.loginService.logged.next(false);
    }
}
