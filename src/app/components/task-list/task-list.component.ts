import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
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
  exampleTasksSubscription = Subscription.EMPTY;
  tasksSubscription = Subscription.EMPTY;
  tasksCompleted: number = 0;
  tasks: Task[] = [];

  constructor(private http: HttpClient, private taskService: TaskService) {}

  ngOnInit(): void {
    this.exampleTasksSubscription = this.taskService.getExampleTasks().subscribe((tasks) => {
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
    this.tasksSubscription.unsubscribe();
    this.exampleTasksSubscription.unsubscribe();
  }

  removeTask(taskTitle: string) {
    this.taskService.removeTask(taskTitle);
  }


}
