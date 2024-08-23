import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { HttpClient } from "@angular/common/http";
import { backend_users } from "../constants/endpoints";

@Injectable({
    providedIn: 'root'
})
export class userService {
    constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(backend_users);
    }
}