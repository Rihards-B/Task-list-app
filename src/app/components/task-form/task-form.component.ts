import { formatDate } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TaskFormValidationService } from 'src/app/sevices/taskFormValidation.service';
import { FormErrorComponent } from '../form-error/form-error.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { EventEmitter } from '@angular/core';
import { taskStatus, taskType } from 'src/app/constants/taskConstants';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormErrorComponent, ReactiveFormsModule, FormsModule, TaskListComponent, RouterModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {
  @Input() submitText: string = "Submit";
  @Input() task: Task | null = null;
  @Input() formType: string | null = null;

  @Output() formSubmitted = new EventEmitter<Task>();

  editing: boolean = false;
  taskTypes = Object.values(taskType).filter(value => typeof value === 'string');
  taskStatuses = Object.values(taskStatus).filter(value => typeof value === 'string');
  formGroup: FormGroup = this.formBuilder.group({
    title: ["", [Validators.required, this.taskFormValidationService.uniqueTitle()]
    ],
    description: [""],
    type: ["", Validators.required],
    status: ["incomplete", Validators.required],
    createdOn: [formatDate(0, "yyyy-MM-dd", "en")],
    _id: [null]
  })

  constructor(private formBuilder: FormBuilder,
    private taskFormValidationService: TaskFormValidationService) {};

  ngOnInit(): void {
    if (this.task) {
      this.formGroup.patchValue(this.task);
      this.formGroup.controls["title"].setValidators([
        // Title can be the same as original task
        this.taskFormValidationService.uniqueTitle(this.task.title),
        Validators.required
      ])
      this.formGroup.disable();
    }
  }

  submit(formGroup: FormGroup) {
    this.formSubmitted.emit(formGroup.value);
  }

  enableEdit() {
    this.editing = true;
    this.formGroup.enable();
  }
}
