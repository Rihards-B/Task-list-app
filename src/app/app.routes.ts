import { Routes } from '@angular/router';
import { TasksCardComponent } from './components/tasks-card/tasks-card.component';
import { AddTaskFormComponent } from './components/add-task-form/add-task-form.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { loggedInGuard, blockLoggedInUserGuard } from './guards/auth.guard';
import { TaskResolver } from './resolvers/taskResolver';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    { path: "", component: TasksCardComponent, canActivate: [loggedInGuard] },
    { path: "add-task", component: AddTaskFormComponent },
    { path: ":id/details", component: TaskDetailsComponent, resolve: { task: TaskResolver } },
    { path: "register", component: RegisterComponent, canActivate: [blockLoggedInUserGuard] },
    { path: "login", component: LoginComponent, canActivate: [blockLoggedInUserGuard] },
    { path: "404", component: PageNotFoundComponent },
    { path: "**", redirectTo: "/404" }
];
