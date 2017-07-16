import { LoginService } from './services/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'To Do App';
  constructor(private _login: LoginService) {  }
  logout() {
    //this._login.logout();
    this._login.logout();

  }
}
