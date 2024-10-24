import { Role } from "./role.model"

export type User = {
    username: string,
    first_name: string,
    last_name: string,
    roles: Role[],
    _id?: string
} 