import { LoadingService } from './loading.service';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, FirebaseListObservable } from 'angularfire2';


@Injectable()
export class LoginService {
  private _userDetails: any;
  private _users: any;
  constructor(private _af: AngularFire, private _router: Router, private _loading:LoadingService) {

    this._af.auth.subscribe(user => {
      if (user) {
        // user logged in
        this.setUserDetails(user);
      }
      else {
        this.routeToLogin();
      }

    });
  }

  setUserDetails(user) {
    this._userDetails = { id: user.auth.uid, name: user.auth.displayName };
    localStorage.setItem('userDetails', JSON.stringify(this._userDetails));
    this._users = this._af.database.list('users', {
      query: {
        orderByChild: 'id',
        equalTo: user.auth.uid,
      }
    });
    this._users.subscribe((data) => {
      if (data.length == 0) {
        this._users.push(this._userDetails);
      }
      this.routeToTask();
    }, (error) => {
      this.routeToLogin();
    })

  }
  getUserDetails() {
    return this._userDetails || JSON.parse(localStorage.getItem('userDetails'));
  }
  routeToLogin() {
    this._router.navigate(['/login']);
  }
  routeToTask() {
    this._router.navigate(['/tasks']);
  }
  login(): any {
    this._loading.showLoader();
    this._af.auth.login({
      provider: AuthProviders.Google
    });

  }
  logout() {
    this._af.auth.logout().then(() => { localStorage.setItem('userDetails', null); });
  }
  
}
