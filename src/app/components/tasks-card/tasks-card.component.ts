import { Component } from '@angular/core';
import { TaskListComponent } from '../task-list/task-list.component';
import { AddTaskButtonComponent } from '../add-task-button/add-task-button.component';

@Component({
  selector: 'app-tasks-card',
  standalone: true,
  imports: [TaskListComponent, AddTaskButtonComponent],
  templateUrl: './tasks-card.component.html',
  styleUrl: './tasks-card.component.scss'
})
export class TasksCardComponent {

}
