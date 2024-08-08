import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';
import { backend_tasks } from '../constants/endpoints';

@Injectable({
  providedIn: 'root'
})
export class TaskService{
  tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  tasksCompleteSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {};

  // GET /tasks
  // Returns a list of all tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(backend_tasks);
  }

  addTask(task: Task) {
    this.tasksSubject.value.push(task);
    this.tasksCompleteSubject.next(this.countCompletedTasks());
  }

  setTasks(tasks: Task[]) {
    this.tasksSubject.next(tasks);
    this.tasksCompleteSubject.next(this.countCompletedTasks());
  }

  getTaskByTitle(title: string): Task | null {
    return this.tasksSubject.getValue().find((task) => task.title === title) ?? null;
  }
  
  removeTask(taskTitle: string) {
    let tasks: Task[] = this.tasksSubject.getValue();
    tasks.splice(tasks.findIndex((task) => task.title === taskTitle), 1)
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