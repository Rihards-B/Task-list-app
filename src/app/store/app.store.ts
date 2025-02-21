import { Action, ActionReducer } from "@ngrx/store"
import { TaskState } from "./task/task.state"
import { taskReducer } from "./task/task.reducer"
import { TaskEffects } from "./task/task.effects"

export interface AppState {
    task: TaskState
}

export interface AppStore {
    task: ActionReducer<TaskState, Action>
}

export const appStore: AppStore = {
    task: taskReducer
}

export const appEffects = [TaskEffects]