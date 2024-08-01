import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../sevices/task.service';

@Component({
  selector: 'app-remove-button',
  standalone: true,
  imports: [],
  templateUrl: './remove-button.component.html',
  styleUrl: './remove-button.component.scss'
})
export class RemoveButtonComponent {
  @Input() keyToRemove: any | null = null;
  @Output() removeKey = new EventEmitter<any>();
  
  constructor(private taskService: TaskService) {}

  onClick() {
    if(this.keyToRemove) {
      this.removeKey.emit(this.keyToRemove);
    }
  }
}