import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
export class AddTaskFormComponent implements OnInit, OnDestroy, AfterViewInit {
  typeOptions: string[] = [
    "Story",
    "Task"
  ]

  @ViewChild('addformtemplate') popupContent?: TemplateRef<any>;
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
      private dialogRef: MatDialog,
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

  ngOnDestroy(): void {
    this.dialogRef.closeAll();
  }

  ngAfterViewInit(): void {
    this.openForm();
    this.dialogRef.afterAllClosed.subscribe(() => {
      this.router.navigateByUrl("/");
    })
  }

  submit(formGroup: FormGroup) {
    formGroup.markAllAsTouched();
    if(formGroup.valid) {
      let formResult = formGroup.value;
      let task: Task = new Task(formResult.title, formResult.description, formResult.type, "incomplete");
      this.taskService.addTask(task);
      this.dialogRef.closeAll();
      this.formGroup.reset();
    }
  }

  openForm() {
    if (this.popupContent) {
      this.dialogRef.open(this.popupContent, undefined)
    }
  }

}
