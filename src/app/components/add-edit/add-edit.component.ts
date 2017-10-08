import { ITask } from './../../models/task';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit, AfterViewInit {
  @Input() task;
  @Output() saveEvent = new EventEmitter();
  @Output() modalClose = new EventEmitter();
  @ViewChild('bottomSheetModal') modal: any;
  modalHeader: string = "Add Task";
  currentTask = null;
  selectOptions = ['Pending', 'Done'];

  constructor() { }

  ngOnInit() {
    this.initModalContent()
  }
  ngAfterViewInit() {
    this.openModal();
  }
  initModalContent(){
    this.currentTask = Object.assign({}, this.task);
    if(this.currentTask.title){
      this.modalHeader = "Edit Task";
      return;
    }
    this.currentTask.status = this.selectOptions[0];
    
  }
  openModal() {
    this.modal.open();
  }

  closeModal() {
    this.modal.close();
    this.modalClose.emit();
  }

  saveData() {
    this.closeModal();
    this.saveEvent.emit(this.currentTask);
  }
}
