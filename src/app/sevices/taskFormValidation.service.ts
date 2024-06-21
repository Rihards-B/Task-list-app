import { Injectable } from '@angular/core';
import { TaskService } from './task.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TaskFormValidationService {
  constructor(private taskService: TaskService) {}

  uniqueTitle(): ValidatorFn {
    return(control: AbstractControl): ValidationErrors | null => {
      return this.taskService.getTaskByTitle(control.value) ? {uniqueTitle: "Title already exists"} : null
    }
  }
}