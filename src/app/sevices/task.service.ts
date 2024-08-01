import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService{
  initialized: Boolean = false;
  tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  tasksCompleteSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  // Temporary variable to keep track of IDs, will be using the backend ones later
  lastTaskID: number = 0;

  constructor(private http: HttpClient) {};

  getExampleTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('assets/dummy-tasks.json');
  }

  addTask(task: Task) {
    this.tasksSubject.value.push(task);
    this.tasksCompleteSubject.next(this.countCompletedTasks());
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
    return this.tasksSubject.getValue().find((task) => task.id === id) ?? null;
  }
  
  removeTask(taskTitle: string) {
    let tasks: Task[] = this.tasksSubject.getValue();
    tasks.splice(tasks.findIndex((task) => task.title === taskTitle), 1)
  }

  removeTaskByID(id: string) {
    let tasks: Task[] = this.tasksSubject.getValue();
    tasks.splice(tasks.findIndex((task) => task.id === id), 1)
  }

  getNextTaskID() {
    this.lastTaskID++;
    return this.lastTaskID.toString();
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