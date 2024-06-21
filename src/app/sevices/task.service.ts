import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService{
  tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  tasksCompleteSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {};

  getExampleTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('assets/dummy-tasks.json');
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
    let result = this.tasksSubject.getValue().find((task) => task.title === title);
    return result ? result : null;
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