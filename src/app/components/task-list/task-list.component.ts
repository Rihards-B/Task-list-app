import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { TaskComponent } from '../task/task.component';
import { RemoveButtonComponent } from 'src/app/remove-button/remove-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppState } from 'src/app/store/app.store';
import { Store } from '@ngrx/store';
import { getTasks, removeTask } from 'src/app/store/task/task.actions';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [HttpClientModule, NgFor, NgIf, TaskComponent, RemoveButtonComponent, CommonModule, TranslateModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})

export class TaskListComponent implements OnInit {
  tasksCompleted$: Observable<number> = this.store.select(state => state.task.completedTasks);
  tasks$: Observable<Task[]> = this.store.select(state => state.task.tasks)
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(getTasks());
  }

  removeTask(taskID: string) {
    this.store.dispatch(removeTask({ id: taskID }));
  }
}
