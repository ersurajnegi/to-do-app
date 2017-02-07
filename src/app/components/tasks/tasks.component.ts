import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { ITask } from '../../models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks = Array<ITask>();
  currentTask = null;
  taskToDelete = null;
  showLoader: boolean = true;
  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    this.getTasks();
  }
  getTasks() {
    this.apiService.getData()
      .subscribe(data => {
        this.tasks = data;
        this.showLoader = false;
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
      this.apiService.updateTask($event).then(() => {
        this.showLoader = false;
        this.currentTask = null;
      }, (error) => {
        this.currentTask = null;
      })
    }
    else {
      this.apiService.createTask($event).then(() => {
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
    this.apiService.removeTask(task).then(() => {
      this.taskToDelete = null;
    });
  }
  handleDeleteModalClose() {
    this.taskToDelete = null;
  }

}
