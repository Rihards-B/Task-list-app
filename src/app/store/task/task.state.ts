import { Task } from "src/app/models/task.model";

export interface TaskState {
    tasks: Task[];
    completedTasks: number;
}

export const initialState: TaskState = {
    tasks: [],
    completedTasks: 0
}