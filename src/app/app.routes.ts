import { Routes } from '@angular/router';
import { TasksCardComponent } from './components/tasks-card/tasks-card.component';
import { AddTaskFormComponent } from './components/add-task-form/add-task-form.component';

export const routes: Routes = [
    {path: "", component: TasksCardComponent},
    {path: "add-task", component: AddTaskFormComponent}
];
