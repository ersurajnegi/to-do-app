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
    this._tasks =  this._ngDatabase.list('tasks', {
      query: {
        orderByChild: 'createdBy',
        equalTo: id
      }
    });
    return this._tasks;
  }

  createTask({task, id}) {
    task.createdBy = id;
    return this._tasks.push(task);
  }

  updateTask({task, id}) {
    // let test = { id: task.id, title: task.title, status: task.status };
    
    return this._tasks.update(task.$key, task);
  }

  removeTask(task) {
    return this._tasks.remove(task.$key);
  }
}
