import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../sevices/task.service';
import { Task } from '../../models/task';
import { TaskFormValidationService } from 'src/app/sevices/taskFormValidation.service';
import { FormErrorComponent } from '../form-error/form-error.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task-form',
  standalone: true,
  imports: [FormErrorComponent, ReactiveFormsModule, FormsModule, TaskListComponent, FormErrorComponent, RouterModule],
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.scss'
})
export class AddTaskFormComponent implements OnDestroy {
  typeOptions: string[] = [
    "Story",
    "Task"
  ]

  formGroup: FormGroup = this.formBuilder.group({
    title: ["", {
      validators: [Validators.required,
      this.taskFormValidationService.uniqueTitle(),
      ]
    }],
    description: [""],
    type: ["", { validators: [Validators.required] }]
  });

  private postSubscription = Subscription.EMPTY;

  constructor(private formBuilder: FormBuilder,
    private taskService: TaskService,
    private taskFormValidationService: TaskFormValidationService,
    private router: Router) { }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

  submit(formGroup: FormGroup) {
    formGroup.markAllAsTouched();
    if (formGroup.valid) {
      let formResult = formGroup.value;
      let task: Task = new Task(formResult.title, formResult.description, formResult.type, "incomplete");
      this.postSubscription = this.taskService.addTask(task).subscribe(() => [
        this.router.navigateByUrl("/")
      ]);
    }
  }
}