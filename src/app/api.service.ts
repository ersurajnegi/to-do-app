import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Observable } from 'rxjs/Rx';

import { ITask, } from './models/task';

@Injectable()
export class ApiService {
  private _tasks: FirebaseListObservable<ITask[]>;
  private currentUser: any;
  constructor(private _ngDatabase: AngularFireDatabase) { }
  getData({ id }) {
    this._tasks = this._ngDatabase.list('tasks', {
      query: {
        orderByChild: 'createdBy',
        equalTo: id
      }
    });
    return this._tasks;
  }

  createTask({ task }) {
    return this._tasks.push(task);

  }

  updateTask({ task }) {
    const $key = task.$key;
    delete task.$key;
    return this._tasks.update($key, task);
  }

  removeTask(task) {
    return this._tasks.remove(task.$key);
  }
}
