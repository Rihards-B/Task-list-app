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
import { hasSomeRole } from './guards/role.guard';
import { GroupResolver } from './resolvers/group.resolver';
import { GroupManagementComponent } from './components/group-management/group-management.component';

export const routes: Routes = [
    { path: "", component: TasksCardComponent, canActivate: [loggedInGuard] },
    { path: "add-task", component: AddTaskFormComponent, canActivate: [loggedInGuard], resolve: { groups: GroupResolver } },
    { path: ":id/details", component: TaskDetailsComponent, canActivate: [hasSomeRole(["Admin", "Manager"])], resolve: { task: TaskResolver, groups: GroupResolver } },
    { path: "users/current", component: UserDetailsComponent, resolve: { user: UserResolver }, canActivate: [loggedInGuard] },
    { path: "users/:id", component: UserDetailsComponent, resolve: { user: UserResolver, roles: RoleResolver, groups: GroupResolver }, canActivate: [hasSomeRole(["Admin"])] },
    { path: "register", component: RegisterComponent, canActivate: [blockLoggedInUserGuard] },
    { path: "login", component: LoginComponent, canActivate: [blockLoggedInUserGuard] },
    { path: "groups", component: GroupManagementComponent, resolve: { groups: GroupResolver }, canActivate: [hasSomeRole(["Admin"])] },
    { path: "404", component: PageNotFoundComponent },
    { path: "**", redirectTo: "/404" }
];
