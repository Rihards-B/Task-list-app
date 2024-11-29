import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { backend_users } from "../constants/endpoints";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {}

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
        return this.http.put<User>(backend_users + userId, user);
    }
}