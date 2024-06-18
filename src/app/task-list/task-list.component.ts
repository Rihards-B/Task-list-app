import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Task } from '../models/task';
import { NgFor, NgIf } from '@angular/common';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [HttpClientModule, NgFor, NgIf, TaskComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasksCompleted: number = 0;
  tasks: Task[] = [];
  private subscription: Subscription;

  constructor(private http: HttpClient,) {
    this.subscription = Subscription.EMPTY;
  }

  ngOnInit(): void {
    this.subscription = this.http.get('assets/dummy-tasks.json').subscribe((res: any) => {
      this.tasks = res;
    });
    this.updateCompletedTasksCount();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateCompletedTasksCount() {
    this.tasksCompleted = 0;
    this.tasks.forEach((task) => {
      if (task.status === "complete") {
        this.tasksCompleted++;
      }
    })
  }
}
