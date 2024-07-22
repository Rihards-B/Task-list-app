import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../sevices/task.service';
import { Task } from '../../models/task';
import { TaskFormValidationService } from 'src/app/sevices/taskFormValidation.service';
import { FormErrorComponent } from '../form-error/form-error.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-task-form',
  standalone: true,
  imports: [FormErrorComponent, ReactiveFormsModule, FormsModule, TaskListComponent, FormErrorComponent, RouterModule],
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.scss'
})
export class AddTaskFormComponent implements OnInit {
  typeOptions: string[] = [
    "Story",
    "Task"
  ]
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
      private taskService: TaskService,
      private taskFormValidationService: TaskFormValidationService,
      private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: ["", {validators: [Validators.required,
        this.taskFormValidationService.uniqueTitle(),
      ]}],
      description: [""],
      type: ["", {validators: [Validators.required]}]
    })
  }

  submit(formGroup: FormGroup) {
    formGroup.markAllAsTouched();
    if(formGroup.valid) {
      let formResult = formGroup.value;
      let task: Task = new Task(formResult.title, formResult.description, formResult.type, "incomplete");
      this.taskService.addTask(task);
      this.router.navigateByUrl("/");
    }
  }
}
