import { LoginService } from './services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'To Do App';
  constructor(private _login: LoginService) { }
  userDetails: any = null;
  navbarClass: string = "my-navbar";
  ngOnInit() {
    this._login._userDetails.subscribe((data) => {
      if (data) {
        this.userDetails = data;
        return;
      }
      this.userDetails = null;
    });
  }
  logout() {
    this._login.logout();

  }
}
