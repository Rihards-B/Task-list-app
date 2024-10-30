import { User } from "./user.model"

export type AuthStatus = {
    isLoggedIn: boolean,
    user: User,
    errors: object[]
}