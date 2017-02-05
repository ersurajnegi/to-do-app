import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var $;
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  @Input() taskToDelete;
  @Output() taskToDeleteChange = new EventEmitter();
  modalHeader:string ="";
  constructor() { }

  ngOnInit() {
  }
  confirmDelete(){
      this.taskToDeleteChange.emit(this.taskToDelete);
  }
  ngOnChanges(changes) {
    if (changes.taskToDelete.currentValue.status) {
      this.modalHeader = "Delete Task";
      this.openModal();
    }
    else{
      this.closeModal();
    }
  }
  openModal() {
    $('#deleteModal').modal({ backdrop: 'static' });
  }
  closeModal(){
    $('#deleteModal').modal('hide');
  }
}
