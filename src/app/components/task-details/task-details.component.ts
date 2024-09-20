import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { TaskService } from 'src/app/sevices/task.service';
import { TaskComponent } from '../task/task.component';
import { Subscription, take } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { TaskFormComponent } from '../task-form/task-form.component';
import { taskType } from 'src/app/constants/taskConstants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [TaskComponent, TaskFormComponent, RouterModule, CommonModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})

export class TaskDetailsComponent implements OnInit, OnDestroy {
  paramSubscription: Subscription = Subscription.EMPTY;
  updateSubscription: Subscription = Subscription.EMPTY;
  id: string | null = null;
  task: Task | null = null;
  taskTypes = Object.values(taskType);

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.pipe(take(1)).subscribe(({ task }) => {
      this.task = task;
    })
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
    this.updateSubscription.unsubscribe();
  }

  saveTask(task: Task) {
    this.updateSubscription = this.taskService.updateTask(task).subscribe(() => [
      this.router.navigateByUrl("/")
    ]);
  }
}
