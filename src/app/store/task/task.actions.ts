import { createAction, props } from "@ngrx/store";
import { Task } from "src/app/models/task";

export const getTasks = createAction("[Task] Get tasks");
export const getTasksSuccess = createAction("[Task] Get tasks successful", props<{ tasks: Task[] }>());
export const getTasksFailed = createAction("[Task] Get tasks failed", props<{ error: string }>());
export const removeTask = createAction("[Task] Remove task", props<{ id: string }>());
export const removeTaskSuccess = createAction("[Task] Remove task successful", props<{ removedTask: Task }>());
export const removeTaskFailed = createAction("[Task] Remove task failed", props<{ error: string }>());
export const countCompletedTasks = createAction("[Task] Count completed tasks");

