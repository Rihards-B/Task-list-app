import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject, Observable, ReplaySubject, Subject, take } from "rxjs";
import { User } from "../models/user";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { backend_users } from "../constants/endpoints";
import { isPlatformBrowser } from "@angular/common";
@Injectable({
    providedIn: 'root'
})
export class UserService {
    isLoggedIn = new BehaviorSubject<boolean>(false);
    currentUserSubject: Subject<User> = new ReplaySubject<User>();

    constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            this.isLoggedIn.next(sessionStorage.getItem("isLoggedIn") ? true : false);
        }
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