import { createReducer, on } from "@ngrx/store"
import { initialState } from "./task.state"
import * as TaskActions from "./task.actions"

export const taskReducer = createReducer(
    initialState,
    on(TaskActions.getTasks, state => ({ ...state })),
    on(TaskActions.getTasksSuccess, (state, { tasks }) => ({ ...state, tasks: tasks })),
    on(TaskActions.removeTask, state => ({ ...state })),
    on(TaskActions.removeTaskSuccess, (state, { removedTask }) => ({ ...state, tasks: state.tasks.filter(task => task._id !== removedTask._id) })),
    on(TaskActions.countCompletedTasks, state => ({ ...state, completedTasks: state.tasks.filter(task => task.status.toLowerCase() === "complete").length }))
)