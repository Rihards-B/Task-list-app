import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Subscription, take } from 'rxjs';
import { Task } from '../../models/task';
import { NgFor, NgIf } from '@angular/common';
import { TaskComponent } from '../task/task.component';
import { TaskService } from '../../sevices/task.service';
import { RemoveButtonComponent } from 'src/app/remove-button/remove-button.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [HttpClientModule, NgFor, NgIf, TaskComponent, RemoveButtonComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit, OnDestroy {
  completedTasksSubscription = Subscription.EMPTY;
  tasksCompleted: number = 0;
  tasksSubscription = Subscription.EMPTY;
  tasks: Task[] = [];

  constructor(private http: HttpClient, private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().pipe(take(1)).subscribe((tasks) => {
      this.taskService.setTasks(tasks);
    })
    this.tasksSubscription = this.taskService.tasksSubject.subscribe((tasks) => {
      this.tasks = tasks;
    })
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
