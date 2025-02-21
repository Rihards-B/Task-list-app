import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { TaskService } from 'src/app/sevices/task.service';
import { Subscription, take } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { TaskFormComponent } from '../task-form/task-form.component';
import { taskType } from 'src/app/constants/taskConstants';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AuthStore } from 'src/app/store/auth/auth.store';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [TaskFormComponent, RouterModule, CommonModule, TranslateModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})

export class TaskDetailsComponent implements OnInit, OnDestroy {
  paramSubscription: Subscription = Subscription.EMPTY;
  updateSubscription: Subscription = Subscription.EMPTY;
  id: string | null = null;
  task: Task | null = null;
  taskTypes = Object.values(taskType);
  authStore = inject(AuthStore)

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService
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
    const userRoles = this.authStore.currentUser()?.roles;
    if (userRoles && task._id) {
      if (userRoles.includes("Admin"))
        this.updateSubscription = this.taskService.updateTask(task).subscribe(() => [
          this.router.navigateByUrl("/")
        ]);
      if (!userRoles.includes("Admin") && userRoles.includes("Manager")) {
        this.updateSubscription = this.taskService.updateTaskAssignment(task._id, task.assignedTo, task.groups).subscribe(() => [
          this.router.navigateByUrl("/")
        ]);
      }
    }
  }
}
