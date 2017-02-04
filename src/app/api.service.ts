import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from "angularfire2";
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

import { ITask,  } from './models/task';

@Injectable()
export class ApiService {
  private tasks: FirebaseListObservable<ITask[]>;
  constructor(private af: AngularFire) {
    this.tasks = this.af.database.list('tasks')
  }
  getData() {
    return this.tasks;
  }

  createTask(task){
    return this.tasks.push(task);
  }

  updateTask(task){
    return this.tasks.update(task.$key, task);
  }

  removeTask(task) {
    return this.tasks.remove(task.$key);
  }
}
