import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService{
  jsonSubscription: Subscription = Subscription.EMPTY;
  tasksSubscription: Subscription = Subscription.EMPTY;
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  tasksObservable$: Observable<Task[]> = this.tasksSubject.asObservable();
  tasksComplete$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
    this.tasksSubscription = this.tasksSubject.subscribe((tasks: Task[]) => {});
    this.jsonSubscription = this.http.get('assets/dummy-tasks.json').subscribe((res: any) => {
        this.setTasks(res);
    });

  };

  addTask(task: Task) {
    this.tasksSubject.value.push(task);
    this.tasksComplete$.next(this.countCompletedTasks());
  }

  setTasks(tasks: Task[]) {
    this.tasksSubject.next(tasks);
    this.tasksComplete$.next(this.countCompletedTasks());
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

  ngOnDestroy(): void {
    this.jsonSubscription.unsubscribe();
    this.tasksSubscription.unsubscribe();
  }
}