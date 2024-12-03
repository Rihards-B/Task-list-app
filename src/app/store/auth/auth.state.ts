import { User } from "src/app/models/user.model";

export interface AuthStateInterface {
    isLoggedIn: boolean | null;
    currentUser: User | null;
    errors: string[];
}

export const InitialAuthState: AuthStateInterface = {
    isLoggedIn: null,
    currentUser: null,
    errors: []
}