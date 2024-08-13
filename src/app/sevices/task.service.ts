import { Injectable } from '@angular/core';
import { BehaviorSubject, take, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';
import { backend_tasks } from '../constants/endpoints';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  initialized: Boolean = false;
  tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  tasksCompleteSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  // Temporary variable to keep track of IDs, will be using the backend ones later
  lastTaskID: number = 0;

  constructor(private http: HttpClient) { };

  // GET /tasks
  // Returns a list of all tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(backend_tasks);
  }

  // Get /tasks/:id
  // Finds and returns a task by ID

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(backend_tasks + id);
  }

  // Post /tasks
  // Adds a task to the database
  addTask(task: Task): Observable<unknown> {
    return this.http.post<Task>(backend_tasks, task);
  }

  setTasks(tasks: Task[]) {
    // Setting the starting point of manually created task IDs
    this.lastTaskID = tasks.length;
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

  removeTask(taskTitle: string) {
    let tasks: Task[] = this.tasksSubject.getValue();
    tasks.splice(tasks.findIndex((task) => task.title === taskTitle), 1)
  }

  removeTaskByID(id: string) {
    let tasks: Task[] = this.tasksSubject.getValue();
    tasks.splice(tasks.findIndex((task) => task._id === id), 1)
  }

  getNextTaskID() {
    this.lastTaskID++;
    return this.lastTaskID.toString();
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