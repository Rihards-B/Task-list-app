import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Task } from '../models/task';
import { NgFor, NgIf } from '@angular/common';
import { TaskComponent } from '../task/task.component';
import { TaskService } from '../sevices/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [HttpClientModule, NgFor, NgIf, TaskComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasksCompleted: number = 0;
  tasksSubsciption: Subscription = Subscription.EMPTY;
  tasks: Task[] = [];

  constructor(private http: HttpClient, private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.tasksObservable$.subscribe((tasks) => {
      this.tasks = tasks;
    })
    this.taskService.tasksComplete$.subscribe((completeCount) => {
      this.tasksCompleted = completeCount;
    })
  }

  ngOnDestroy(): void {
    this.tasksSubsciption.unsubscribe();
  }


}
