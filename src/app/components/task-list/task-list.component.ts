import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription, take } from 'rxjs';
import { Task } from '../../models/task';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { TaskComponent } from '../task/task.component';
import { TaskService } from '../../sevices/task.service';
import { RemoveButtonComponent } from 'src/app/remove-button/remove-button.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [HttpClientModule, NgFor, NgIf, TaskComponent, RemoveButtonComponent, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit, OnDestroy {
  completedTasksSubscription = Subscription.EMPTY;
  tasksCompleted: number = 0;
  deleteSubscription = Subscription.EMPTY;
  tasks$: Observable<Task[]> = this.taskService.tasksSubject.asObservable();

  constructor(private http: HttpClient, private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.refresh();
    this.completedTasksSubscription = this.taskService.tasksCompleteSubject.subscribe((completeCount) => {
      this.tasksCompleted = completeCount;
    })
  }

  ngOnDestroy(): void {
    this.completedTasksSubscription.unsubscribe();
  }

  removeTask(taskID: string) {
    this.taskService.removeTaskByID(taskID);
  }
}
