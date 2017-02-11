import { LoadingService } from './../../services/loading.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  isLoading:boolean = false;
  constructor(private _login:LoadingService) { 
    this._login.startLoader.subscribe((loading) => {
      this.isLoading = loading;
    })
  }

}
