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
  }
  login(resource): any {
    if (resource == "google")
      this._ngAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    else
      this._ngAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
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
    }, (error) => {
    });

  }
  routeToLogin() {
    this._router.navigate(['/login']);
  }
  routeToTask() {
    this._router.navigate(['/tasks']);
  }


}
