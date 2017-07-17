import { LoginService } from './../../services/login.service';

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
  isLoading: boolean = false;
  $key: null;
  constructor(
    private _apiService: ApiService,
    private _login: LoginService) {

  }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.isLoading = true;
    this._login._userDetails.subscribe((data) => {
      if (data) {
        this.userDetails.id = data.uid;
        this.getTasks();
        return;
      }
      this.userDetails = null;
    })
  }
  getTasks() {
    this._apiService.getData({ id: this.userDetails.id })
      .subscribe(data => {
        this.tasks = data;
        this.isLoading = false;
      },
      (error) => {
      })
  }

  addTask() {
    this.currentTask = { title: "", status: "" };
  }
  editTask(task) {
    this.currentTask = task;
    this.$key = task.$key;
  }

  saveTask($event) {
    if ($event.createdBy) {
      this.updateTask($event);
      return;
    }
    this.createTask($event);
  }
  createTask($event) {
    $event.createdBy = this.userDetails.id;
    this._apiService.createTask({ task: $event }).then(_ => {
      this.currentTask = null;
    });
  }
  updateTask($event) {
    $event.$key = this.$key;
    this._apiService.updateTask({ task: $event }).then(_ => {
      this.currentTask = null;
    });

  }
  modalClose() {
    this.currentTask = null;
  }

  handleDeleteTask(task) {
    this._apiService.removeTask(task).then(() => {
      this.taskToDelete = null;
    });
  }
}
