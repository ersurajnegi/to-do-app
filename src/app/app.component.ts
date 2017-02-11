import { LoginService } from './services/login.service';
import { AngularFire } from 'angularfire2';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'To Do App';
  userDetails: any;
  constructor(private _af: AngularFire, private _login: LoginService) {
    this._af.auth.subscribe(user => {
      if (user) {
        this.userDetails = user.google;
      }
      else {
        this.userDetails = null;
      }
    });

  }
  logout(){
    this._login.logout();
  }
}
