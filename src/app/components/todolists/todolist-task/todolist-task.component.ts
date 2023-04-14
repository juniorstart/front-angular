import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TodoListTask} from '../../../types/todoLists';

@Component({
  selector: 'app-todolist-task',
  templateUrl: './todolist-task.component.html',
  styleUrls: ['./todolist-task.component.scss']
})
export class TodolistTaskComponent {

  @Input() task!: TodoListTask
  @Output() delete = new EventEmitter()
  @Output() edit = new EventEmitter()


  deleteTodoListTask(){
    this.delete.emit()
  }

  editTodoListTask(){
    this.edit.emit()
  }

}
