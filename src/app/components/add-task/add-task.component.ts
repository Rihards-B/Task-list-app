import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskService } from '../../sevices/task.service';
import { Task } from '../../models/task';
import { TaskFormValidationService } from 'src/app/sevices/taskFormValidation.service';
import { title } from 'process';
import { FormErrorComponent } from '../form-error/form-error.component';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgFor, TaskListComponent, FormErrorComponent, NgClass],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit {
  typeOptions: string[] = [
    "Story",
    "Task"
  ]
  @ViewChild('addformtemplate') popupContent?: TemplateRef<any>;
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
      private dialogRef: MatDialog,
      private taskService: TaskService,
      private taskFormValidationService: TaskFormValidationService) { }

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
