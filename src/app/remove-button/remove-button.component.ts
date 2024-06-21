import { Component, Input } from '@angular/core';
import { TaskService } from '../sevices/task.service';

@Component({
  selector: 'app-remove-button',
  standalone: true,
  imports: [],
  templateUrl: './remove-button.component.html',
  styleUrl: './remove-button.component.scss'
})
export class RemoveButtonComponent {
  @Input() taskTitle: string | null = null;

  constructor(private taskService: TaskService) {}

  onClick() {
    if(this.taskTitle) {
      this.taskService.removeTask(this.taskTitle);
    }
  }
}