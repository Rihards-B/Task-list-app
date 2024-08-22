import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute, RouterModule } from '@angular/router';
import { TaskService } from 'src/app/sevices/task.service';
import { TaskComponent } from '../task/task.component';
import { Subject, Subscription, take } from 'rxjs';
import { Task } from 'src/app/models/task';
import { TaskFormComponent } from '../task-form/task-form.component';
import { taskType } from 'src/app/constants/taskConstants';
import { formType } from 'src/app/constants/formType';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [TaskComponent, TaskFormComponent, RouterModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})

export class TaskDetailsComponent implements OnInit, OnDestroy {
  paramSubscription: Subscription = Subscription.EMPTY;
  updateSubscription: Subscription = Subscription.EMPTY;
  id: string | null = null;
  task: Task | null = null;
  taskTypes = Object.values(taskType);
  formType = formType;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    this.paramSubscription = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get("id");
      if (this.id) {
        this.taskService.getTask(this.id).pipe(take(1)).subscribe((task) => {
          this.task = task;
        });
      }
    });
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
