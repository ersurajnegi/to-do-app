import { LoginService } from './services/login.service';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from "angularfire2";
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

import { ITask, } from './models/task';

@Injectable()
export class ApiService {
  private _tasks: FirebaseListObservable<ITask[]>;
  constructor(private af: AngularFire,private login : LoginService) {
    this._tasks = this.af.database.list('tasks',{
      query:{
        orderByChild: 'createdBy',
        equalTo: this.login.getUserDetails().id,
      }
    })
  }
  getData() {
    return this._tasks;
  }

  createTask(task) {
    task.createdBy= this.login.getUserDetails().id
    return this._tasks.push(task);
  }

  updateTask(task) {
    let test = { id: task.id, title: task.title, status: task.status, createdBy: this.login.getUserDetails().id };
    return this._tasks.update(task.$key, test);
  }

  removeTask(task) {
    return this._tasks.remove(task.$key);
  }
}
