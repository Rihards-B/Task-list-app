import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TasksCardComponent } from './components/tasks-card/tasks-card.component';
import { NavComponent } from "./components/nav/nav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TasksCardComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task-list-app';
}
