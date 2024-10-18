import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject, Observable, ReplaySubject, Subject, take, tap } from "rxjs";
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

    // GET /users/current
    // Returns the current user, based on the JWT token in cookies
    getCurrentUser(): Observable<User> {
        return this.http.get<User>(backend_users + "current");
    }

    // GET /users/<id>
    // Looks for a user with the provided id
    getUser(id: string): Observable<User> {
        return this.http.get<User>(backend_users + id);
    }

    // PUT /users/<id>
    // Updates the user with the user data from body,
    // Returns the updated user
    updateUser(user: User, userId: string): Observable<User> {
        return this.http.put<User>(backend_users + userId, user).pipe(tap({
            next: () => {
                this.updateCurrentUser();
            }
        }))
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