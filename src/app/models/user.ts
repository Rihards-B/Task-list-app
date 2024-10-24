import { Role } from "./role-model"

export type User = {
    username: string,
    firstName: string,
    lastName: string,
    roles: Role[],
    _id?: string
} 