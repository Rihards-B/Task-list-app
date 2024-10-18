import { Routes } from '@angular/router';
import { TasksCardComponent } from './components/tasks-card/tasks-card.component';
import { AddTaskFormComponent } from './components/add-task-form/add-task-form.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { loggedInGuard, blockLoggedInUserGuard } from './guards/auth.guard';
import { TaskResolver } from './resolvers/taskResolver';
import { RegisterComponent } from './components/register/register.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserResolver } from './resolvers/user-resolver';
import { RoleResolver } from './resolvers/role.resolver';
import { isAdminGuard } from './guards/role.guard';

export const routes: Routes = [
    { path: "", component: TasksCardComponent, canActivate: [loggedInGuard] },
    { path: "add-task", component: AddTaskFormComponent },
    { path: ":id/details", component: TaskDetailsComponent, resolve: { task: TaskResolver } },
    { path: "users/:id", component: UserDetailsComponent, resolve: { user: UserResolver, roles: RoleResolver }, canActivate: [isAdminGuard] },
    { path: "register", component: RegisterComponent, canActivate: [blockLoggedInUserGuard] },
    { path: "login", component: LoginComponent, canActivate: [blockLoggedInUserGuard] },
    { path: "404", component: PageNotFoundComponent },
    { path: "**", redirectTo: "/404" }
];
