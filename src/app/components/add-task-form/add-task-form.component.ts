import { Component, OnDestroy } from '@angular/core';
import { TaskService } from '../../sevices/task.service';
import { Task } from '../../models/task.model';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-add-task-form',
  standalone: true,
  imports: [RouterModule, TaskFormComponent],
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.scss'
})
export class AddTaskFormComponent implements OnDestroy {
  private postSubscription = Subscription.EMPTY;

  constructor(
    private taskService: TaskService,
    private router: Router) {}

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

  addTask(task: Task) {
    this.postSubscription = this.taskService.addTask(task).subscribe(() => [
      this.router.navigateByUrl("/")
    ]);
  }
}