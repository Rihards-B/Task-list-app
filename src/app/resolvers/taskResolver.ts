import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Task } from "../models/task";
import { Inject, inject } from "@angular/core";
import { TaskService } from "../sevices/task.service";

export const TaskResolver: ResolveFn<Task> = (
    route: ActivatedRouteSnapshot,
) => {
    const id: string = route.paramMap.get('id') || ' ';
    console.log("Getting task with ID:", id);
    const taskService = inject(TaskService);
    return taskService.getTask(id);
}