import { Component, OnChanges, Input,Output, EventEmitter } from '@angular/core';
declare var $;
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnChanges {
  @Input() task;
  @Output() addUpdate = new EventEmitter();
  modalHeader: string = "";
  constructor() {
     
  }

  ngOnChanges(changes) {
    if (changes.task.currentValue.status) {
      this.modalHeader = changes.task.currentValue.title ? "Edit Task" : "Add Task";
      this.openModal();
    }
    else
      this.closeModal();
  }
  openModal() {
    $('#modal').modal({ backdrop: 'static' });
  }

  closeModal(){
    $('#modal').modal('hide');
  }

  saveData(){
      this.addUpdate.emit(this.task);
  }
}
