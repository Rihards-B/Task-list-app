import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Task } from '../../models/task';
import { NgFor, NgIf } from '@angular/common';
import { TaskComponent } from '../task/task.component';
import { TaskService } from '../../sevices/task.service';
import { RemoveButtonComponent } from 'src/app/remove-button/remove-button.component';
import { Router } from '@angular/router';

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
  deleteSubscription = Subscription.EMPTY;
  tasksSubscription = Subscription.EMPTY;
  tasks: Task[] = [];

  constructor(private http: HttpClient, private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.taskService.refresh();
    this.tasksSubscription = this.taskService.tasksSubject.subscribe(tasks => {
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
    this.deleteSubscription = this.taskService.removeTaskByID(taskID).subscribe(() => {
      this.router.navigateByUrl("/").then(() => {
        this.taskService.refresh();
      });
    });
  }
}
