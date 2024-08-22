import { Injectable } from '@angular/core';
import { TaskService } from './task.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TaskFormValidationService {
  constructor(private taskService: TaskService) {}

  uniqueTitle(title?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const task = this.taskService.getTaskByTitle(control.value);
      if (title && task) {
        if (task.title === title) {
          return null;
        } else {
          return { uniqueTitle: "Title already exists" };
        }
      }
      if (task) {
        return { uniqueTitle: "Title already exists" };
      } else {
        return null;
      }
    }
  }
}