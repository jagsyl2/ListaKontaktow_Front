import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogged: boolean = false;
  title = 'listaKontakowSPApp';

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.getLogged().subscribe(logged => {
      this.isLogged = logged;
    });
  }
}
