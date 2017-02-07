import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var $;
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  @Input() taskToDelete;
  @Output() handleDelete = new EventEmitter();
  @Output() modalClose = new EventEmitter();
  modalHeader:string ="Delete Task";
  
  ngOnInit() {
    this.openModal();
  }
  confirmDelete(){
      this.handleDelete.emit(this.taskToDelete);
      this.closeModal();
  }
  openModal() {
    $('#deleteModal').modal({ backdrop: 'static' });
  }
  closeModal(){
    $('#deleteModal').modal('hide');
    this.modalClose.emit();
  }
}
