import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() task?: Task | null = null;
}
