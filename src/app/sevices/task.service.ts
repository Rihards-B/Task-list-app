import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { BACKEND_TASKS } from '../constants/endpoints';
import { ErrorHandlingService } from './errorHandling.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient, private errorHandlingService: ErrorHandlingService) {};

  // GET /tasks
  // Returns a list of all tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(BACKEND_TASKS);
  }

  // Get /tasks/:id
  // Finds and returns a task by ID
  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(BACKEND_TASKS + id).pipe(catchError(this.errorHandlingService.handleError));
  }

  // Post /tasks
  // Adds a task to the database
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(BACKEND_TASKS, task);
  }

  // Delete /tasks/:id
  // Removes a task from the database
  removeTaskByID(id: string) {
    return this.http.delete<Task>(BACKEND_TASKS + id);
  }

  // Update /tasks
  // Updates an existing task
  updateTask(task: Task) {
    return this.http.put<Task>(BACKEND_TASKS, task);
  }
}