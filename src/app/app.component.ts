import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TasksCardComponent } from './components/tasks-card/tasks-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TasksCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task-list-app';
}
