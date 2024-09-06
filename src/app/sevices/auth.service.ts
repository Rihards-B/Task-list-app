import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, OnInit, PLATFORM_ID } from "@angular/core";
import { authDetails } from "../models/authDetails";
import { authStatus } from "../models/authStatus";
import { backend_auth } from "../constants/endpoints";
import { BehaviorSubject, Observable, shareReplay, tap } from "rxjs";
import { isPlatformBrowser } from "@angular/common";
import { User } from "../models/user";
import { UserService } from "./user.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object,
        private userService: UserService) {
        if (isPlatformBrowser(platformId)) {
            this.userService.isLoggedIn.next(sessionStorage.getItem("isLoggedIn") ? true : false);
        }
    };

    // POST /login
    // returns a JWT to store in cookies
    login(authDetails: authDetails): Observable<authStatus> {
        return this.http.post<authStatus>(backend_auth + "login", authDetails).pipe(
            tap({
                next: (response) => {
                    if (response.isLoggedIn) {
                        sessionStorage.setItem("isLoggedIn", "true");
                        sessionStorage.setItem("username", authDetails.username);
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
                    sessionStorage.removeItem("username");
                    this.userService.isLoggedIn.next(false);
                    window.location.reload();
                },
                error: () => {}
            })
        );
    }
}