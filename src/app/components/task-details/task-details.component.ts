import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/sevices/task.service';
import { TaskComponent } from '../task/task.component';
import { Subscription, take } from 'rxjs';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})

export class TaskDetailsComponent implements OnInit, OnDestroy {
  paramSubscription: Subscription = Subscription.EMPTY;
  id: string | null = null;
  task: Task | null = null;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit(): void {
    this.paramSubscription = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get("id");
      if(this.id){
        this.taskService.getTask(this.id)?.pipe(take(1)).subscribe((task) => {
          this.task = task;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}
