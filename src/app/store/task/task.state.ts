import { Task } from "src/app/models/task";

export interface TaskState {
    tasks: Task[];
    completedTasks: number;
}

export const initialState: TaskState = {
    tasks: [],
    completedTasks: 0
}