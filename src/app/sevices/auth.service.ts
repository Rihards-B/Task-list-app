import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthDetails } from "../models/auth-details.model";
import { AuthStatus } from "../models/auth-status.model";
import { backend_auth } from "../constants/endpoints";
import { Observable, Subject, tap } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {};

    // POST /login
    // returns a JWT to store in cookies
    login(authDetails: AuthDetails): Observable<AuthStatus> {
        return this.http.post<AuthStatus>(backend_auth + "login", authDetails).pipe(
            tap({
                next: (response) => {
                    if (response.isLoggedIn) {
                        sessionStorage.setItem("isLoggedIn", "true");
                    }
                    return response;
                }
            })
        );
    }

    // GET /logout
    // Removes the JWT from cookies
    logout(): Observable<Object> {
        return this.http.get(backend_auth + "logout").pipe(
            tap({
                next: () => {
                    sessionStorage.removeItem("isLoggedIn");
                    window.location.reload();
                },
                error: (error) => {
                    console.log(error)
                }
            })
        );
    }

    // POST /register
    // Registers a user and logs them in
    register(user: User, registerErrorsSubject: Subject<string[]>): Observable<AuthStatus> {
        return this.http.post<AuthStatus>(backend_auth + "register", user);
    }
}