import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';
import { backend_tasks } from '../constants/endpoints';
import { ErrorHandlingService } from './errorHandling.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient, private errorHandlingService: ErrorHandlingService) {};

  // GET /tasks
  // Returns a list of all tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(backend_tasks);
  }

  // Get /tasks/:id
  // Finds and returns a task by ID
  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(backend_tasks + id).pipe(catchError(this.errorHandlingService.handleError));
  }

  // Post /tasks
  // Adds a task to the database
  addTask(task: Task): Observable<unknown> {
    return this.http.post<Task>(backend_tasks, task);
  }

  // Delete /tasks/:id
  // Removes a task from the database
  removeTaskByID(id: string) {
    return this.http.delete<Task>(backend_tasks + id);
  }

  // Update /tasks
  // Updates an existing task
  updateTask(task: Task) {
    return this.http.put<Task>(backend_tasks, task);
  }
}