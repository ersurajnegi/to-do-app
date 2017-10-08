import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showLoader: boolean = false;
  constructor(private _login: LoginService) { }

  doLogin(resource) {
    this.showLoader = true;
    this._login.login(resource);
  }
}