import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { authDetails } from "../models/authDetails";
import { authStatus } from "../models/authStatus";
import { backend_auth } from "../constants/endpoints";
import { Observable, Subject, tap } from "rxjs";
import { UserService } from "./user.service";
import { User } from "../models/user";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private userService: UserService, private router: Router) {};

    // POST /login
    // returns a JWT to store in cookies
    login(authDetails: authDetails): Observable<authStatus> {
        return this.http.post<authStatus>(backend_auth + "login", authDetails).pipe(
            tap({
                next: (response) => {
                    if (response.isLoggedIn) {
                        sessionStorage.setItem("isLoggedIn", "true");
                        this.userService.isLoggedIn.next(true);
                        this.userService.updateCurrentUser();
                    }
                }
            })
        );
    }

    // GET /logout
    // Removes the JWT from cookies
    logout(): Observable<any> {
        return this.http.get(backend_auth + "logout").pipe(
            tap({
                next: () => {
                    sessionStorage.removeItem("isLoggedIn");
                    this.userService.isLoggedIn.next(false);
                    window.location.reload();
                },
                error: () => {}
            })
        );
    }

    // POST /register
    // Registers a user and logs them in
    Register(user: User, registerErrorsSubject: Subject<string[]>): Observable<authStatus> {
        return this.http.post<authStatus>(backend_auth + "register", user).pipe(
            tap({
                next: (response) => {
                    if (response.isLoggedIn) {
                        sessionStorage.setItem("isLoggedIn", "true");
                        this.userService.isLoggedIn.next(true);
                        this.userService.updateCurrentUser();
                        this.router.navigateByUrl("/");
                    }
                },
                error: (response) => {
                    if (response instanceof HttpErrorResponse) {
                        if (response.status === 400) {
                            registerErrorsSubject.next(response.error.messages);
                        }
                    }
                }
            })
        )
    }
}