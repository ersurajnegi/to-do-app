import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showLoader: boolean = true;
  constructor(private  _login: LoginService) {  }

  ngOnInit() {
    this._login._userDetails.subscribe((data) => {
      this.showLoader = false;      
      if(data){
        this._login.routeToTask();
        this._login.saveUser(data);
      }
    });
  }
  viaGoogle(){
    this._login.login();
  }
}
