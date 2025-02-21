import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, exhaustMap, map, mergeMap, of, switchMap, tap } from "rxjs";
import { TaskService } from "src/app/sevices/task.service";
import * as TaskActions from "./task.actions"



@Injectable()
export class TaskEffects {
    getTasks$ = createEffect(() => this.actions$.pipe(
        ofType(TaskActions.getTasks),
        exhaustMap(() => this.taskService.getTasks().pipe(
            map(tasks => TaskActions.getTasksSuccess({ tasks: tasks })),
            catchError((error) => of(TaskActions.getTasksFailed({ error: error })))
        )))
    )

    removeTask$ = createEffect(() => this.actions$.pipe(
        ofType(TaskActions.removeTask),
        exhaustMap((action) => this.taskService.removeTaskByID(action.id).pipe(
            map(removedTask => TaskActions.removeTaskSuccess({ removedTask })),
            catchError((error) => of(TaskActions.removeTaskFailed({ error: error }))))
        )
    ))

    countTasks$ = createEffect(() => this.actions$.pipe(
        ofType(TaskActions.getTasksSuccess, TaskActions.removeTaskSuccess),
        map(() => TaskActions.countCompletedTasks())
    ))


    constructor(private actions$: Actions, private taskService: TaskService) {}
}