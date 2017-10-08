import { UserService } from './services/user.service';
import { LoginService } from './services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'To Do App';
  constructor(private _login: LoginService, public _user : UserService) { }
  navbarClass: string = "my-navbar";
  logout() {
    this._login.logout();

  }
}
