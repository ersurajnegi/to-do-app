import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private  login: LoginService) {
  }

  ngOnInit() {
  }
  viaGoogle(){
    this.login.login();
  }
}
