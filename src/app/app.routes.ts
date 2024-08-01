import { Routes } from '@angular/router';
import { TasksCardComponent } from './components/tasks-card/tasks-card.component';
import { AddTaskFormComponent } from './components/add-task-form/add-task-form.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    {path: "", component: TasksCardComponent},
    {path: "add-task", component: AddTaskFormComponent},
    {path: ":id/details", component: TaskDetailsComponent},
    {path: "404", component: PageNotFoundComponent},
    {path: "**", redirectTo: "/404"}
];
