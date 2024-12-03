import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthDetails } from "../models/auth-details.model";
import { AuthStatus } from "../models/auth-status.model";
import { backend_auth } from "../constants/endpoints";
import { Observable } from "rxjs";

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
    // Register(user: User, registerErrorsSubject: Subject<string[]>): Observable<authStatus> {
    //     return this.http.post<authStatus>(backend_auth + "register", user).pipe(
    //         tap({
    //             next: (response) => {
    //                 if (response.isLoggedIn) {
    //                     sessionStorage.setItem("isLoggedIn", "true");
    //                     this.userService.isLoggedIn.next(true);
    //                     this.userService.updateCurrentUser();
    //                     this.router.navigateByUrl("/");
    //                 }
    //             },
    //             error: (response) => {
    //                 if (response instanceof HttpErrorResponse) {
    //                     if (response.status === 400) {
    //                         registerErrorsSubject.next(response.error.messages);
    //                     }
    //                 }
    //             }
    //         })
    //     )
    // }
}