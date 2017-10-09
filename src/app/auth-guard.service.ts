import { UserService } from './services/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private _users: UserService,
    private _router: Router) {

  }
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this._users.userDetails){
      return true;
    }
    this._router.navigate(['/login']);
    return false;
  }

}
