import { inject, Injectable, OnInit, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject, catchError, Observable, ReplaySubject, Subject, take } from "rxjs";
import { User } from "../models/user";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { backend_users } from "../constants/endpoints";
import { isPlatformBrowser } from "@angular/common";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class UserService implements OnInit {
    isLoggedIn = new BehaviorSubject<boolean>(false);
    currentUserSubject: Subject<User> = new ReplaySubject<User>();

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.updateCurrentUser();
    }

    // GET /users
    // Returns all users
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(backend_users);
    }

    // GET /users
    // Returns the current user, based on the JWT token in cookies
    getCurrentUser(): Observable<User> {
        return this.http.get<User>(backend_users + "current");
    }

    updateCurrentUser() {
        this.isLoggedIn.asObservable().pipe(take(1)).subscribe((isLoggedIn) => {
            if (isLoggedIn) {
                this.getCurrentUser().pipe(take(1)).subscribe(user => {
                    this.currentUserSubject.next(user);
                })
            }
        })
    }
}