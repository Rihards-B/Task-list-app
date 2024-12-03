import { HttpClient, HttpErrorResponse } from "@angular/common/http";
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
        return this.http.post<AuthStatus>(backend_auth + "login", authDetails);
    }

    // TODO implement logout and register with SignalStore

    // GET /logout
    // Removes the JWT from cookies
    logout(): Observable<Object> {
        return this.http.get(backend_auth + "logout");
    }

    // POST /register
    // Registers a user and logs them in
    register(user: User): Observable<AuthStatus> {
        return this.http.post<AuthStatus>(backend_auth + "register", user);
    }
}