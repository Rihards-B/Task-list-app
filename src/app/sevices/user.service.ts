import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject, Observable, ReplaySubject, Subject, take } from "rxjs";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { backend_users } from "../constants/endpoints";
import { isPlatformBrowser } from "@angular/common";
@Injectable({
    providedIn: 'root'
})
export class UserService {
    isLoggedInSubject = new BehaviorSubject<boolean>(false);
    currentUserSubject: Subject<User> = new ReplaySubject<User>();

    constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            this.isLoggedInSubject.next(sessionStorage.getItem("isLoggedIn") ? true : false);
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
        this.isLoggedInSubject.asObservable().pipe(take(1)).subscribe((isLoggedIn) => {
            if (isLoggedIn) {
                this.getCurrentUser().pipe(take(1)).subscribe(user => {
                    this.currentUserSubject.next(user);
                })
            }
        })
    }
}