import { LoginService } from './../../services/login.service';
import { LoadingService } from './../../services/loading.service';

import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { ITask } from '../../models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks = Array<ITask>();
  userDetails: any = new Object();
  currentTask = null;
  taskToDelete = null;
  constructor(
    private _apiService: ApiService,
    private _loading: LoadingService,
    private _login: LoginService) {

  }

  ngOnInit() {
    this.getUserDetails()
  }

  getUserDetails() {
    this._login._userDetails.subscribe((data) => {
      this.userDetails.id = data.uid;
       this.getTasks();
    })
  }
  getTasks() {
    this._loading.showLoader();
    this._apiService.getData({id : this.userDetails.id})
      .subscribe(data => {
        this.tasks = data;
        this._loading.hideLoader();
      },
      (error) => {
        this._loading.hideLoader();
      })
  }

  addTask() {
    this.currentTask = { id: this.nextTaskId(), title: "", status: "Pending" };
  }

  editTask(task) {
    this.currentTask = task;
  }

  handleAddUpdate($event) {
    if ($event.hasOwnProperty('$key')) {
      this._apiService.updateTask({task : $event,id : this.userDetails.id}).then(() => {

        this.currentTask = null;
      }, (error) => {
        this.currentTask = null;
      })
    }
    else {
      this._apiService.createTask({task : $event,id : this.userDetails.id}).then(() => {
        this.currentTask = null;
      }, (error) => {
        this.currentTask = null;
      })

    }

  }
  handleAddModalClose() {
    this.currentTask = null;
  }

  nextTaskId() {
    return this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 1000;
  }

  deleteTask(task) {
    this.taskToDelete = task;
  }

  handleDeleteTask(task) {
    this._apiService.removeTask(task).then(() => {
      this.taskToDelete = null;
    });
  }
  handleDeleteModalClose() {
    this.taskToDelete = null;
  }

}
