import { Component } from '@angular/core';
import { TaskListComponent } from '../task-list/task-list.component';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-tasks-card',
  standalone: true,
  imports: [TaskListComponent, AddTaskComponent],
  templateUrl: './tasks-card.component.html',
  styleUrl: './tasks-card.component.scss'
})
export class TasksCardComponent {

}
