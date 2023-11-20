import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NewContactComponent } from './new-contact/new-contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewUserComponent } from './new-user/new-user.component';
import { DeleteContactComponent } from './delete-contact/delete-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    LoginComponent,
    PageNotFoundComponent,
    NewContactComponent,
    NewUserComponent,
    DeleteContactComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'contact-list', component: ContactListComponent},
      {path: 'login', component: LoginComponent},
      {path: 'add-new-contact', component: NewContactComponent},
      {path: 'add-new-user', component: NewUserComponent},
      {path: 'add-delete-contact', component: DeleteContactComponent},
      {path: '', redirectTo: '/contact-list', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
