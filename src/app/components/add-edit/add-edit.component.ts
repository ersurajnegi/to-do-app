import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var $;
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  @Input() task;
  @Output() addUpdate = new EventEmitter();
  @Output() addModalClose = new EventEmitter();
  modalHeader: string = "";
  currentTask = null;
  constructor() {

  }

  ngOnInit() {
    this.currentTask = Object.assign({}, this.task);
    this.modalHeader = this.currentTask.title ? "Edit Task" : "Add Task";
    this.openModal();
  }
  
  openModal() {
    $('#modal').modal({ backdrop: 'static' });
  }

  closeModal(){
    $('#modal').modal('hide');
    this.addModalClose.emit();
  }

  saveData() {
    this.closeModal();
    this.addUpdate.emit(this.currentTask);
  }
}
