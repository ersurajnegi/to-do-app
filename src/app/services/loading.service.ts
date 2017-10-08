import { Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';


@Injectable()
export class LoadingService {
  private _loader = new Subject<boolean>();
  startLoader = this._loader.asObservable();
  constructor(){
  }
  showLoader(){
    this._loader.next(true);
  }
  hideLoader(){
    this._loader.next(false);
  }
}
