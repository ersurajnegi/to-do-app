import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class LoginService {
  _userDetails: Observable<firebase.User>;
  constructor(
    private _ngAuth: AngularFireAuth,
    private _ngDatabase: AngularFireDatabase,
    private _router: Router
  ) {
    this._userDetails = this._ngAuth.authState;
    // this._userDetails.subscribe((data) => {
    //   if (data) {
    //     //this.setUserDetails(data);
    //     this.saveUser(data);
    //   }
    //   else {
    //     this.routeToLogin();
    //   }
    // });
  }
  login(): any {
  
    this._ngAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(() => {
        return false;
      }, (error) => {
        console.log("my error : " + error);
        this.routeToLogin();
      });

  }
  logout() {
    this._ngAuth.auth.signOut();
  }
  saveUser(user) {
    let _users = this._ngDatabase.list('users', {
      query: { orderByChild: 'id', equalTo: user.uid, }
    });
    _users.subscribe((data) => {
      if (!data.length) {
        _users.push({ id: user.uid, name: user.displayName });
      }
      //this.routeToTask();
    }, (error) => {
      //this.routeToLogin();
    });

  }
  routeToLogin() {
    this._router.navigate(['/login']);
  }
  routeToTask() {
    this._router.navigate(['/tasks']);
  }


}
