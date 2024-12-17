import { Injectable } from '@angular/core';
import { BehaviorSubject, take, Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { backend_tasks } from '../constants/endpoints';
import { ErrorHandlingService } from './errorHandling.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  initialized: Boolean = false;
  tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  tasksCompleteSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

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
  addTask(task: Task): Observable<Task> {
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

  setTasks(tasks: Task[]) {
    this.tasksSubject.next(tasks);
    this.tasksCompleteSubject.next(this.countCompletedTasks());
    this.initialized = true;
  }

  getTaskByTitle(title: string): Task | null {
    return this.tasksSubject.getValue().find((task) => task.title === title) ?? null;
  }

  getTaskByID(id: string): Task | null {
    return this.tasksSubject.getValue().find((task) => task._id === id) ?? null;
  }

  // Refreshes the list of tasks stored in the service from DB
  refresh() {
    this.getTasks().pipe(take(1)).subscribe((tasks) => {
      this.setTasks(tasks);
    })
  }

  private countCompletedTasks(): number {
    let completedTasks: number = 0;
    let tasks: Task[] = this.tasksSubject.getValue();
    tasks.forEach((task) => {
      if (task.status === "complete") {
        completedTasks++;
      }
    })
    return completedTasks;
  }
}