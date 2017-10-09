import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';

@Injectable()
export class UserService {
  userDetails: any = null;

  constructor(private _login: LoginService, private _router : Router) {
    this._login._userDetails.subscribe((data) => {
      this.userDetails = data;
      this._router.navigate(['/tasks']);
    });
  }
}
