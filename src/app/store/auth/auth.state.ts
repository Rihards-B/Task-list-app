import { User } from "src/app/models/user.model";

export interface AuthStateInterface {
    isLoggedIn: boolean;
    currentUser: User | null;
}

export const InitialAuthState: AuthStateInterface = {
    isLoggedIn: false,
    currentUser: null
}