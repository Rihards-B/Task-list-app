import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AppState } from '../store/app.store';
import { Store } from '@ngrx/store';
import { Task } from '../models/task.model';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskFormValidationService {
  constructor(private store: Store<AppState>) {}

  uniqueTitle(title?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let tasks: Task[] = []
      this.store.select(state => state.task.tasks).pipe(take(1)).subscribe(storeTasks => {
        tasks = storeTasks;
      })
      const task = tasks.find(task => task.title === control.value);
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