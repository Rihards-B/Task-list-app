import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { backend_roles } from "../constants/endpoints";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    constructor(private http: HttpClient) {}

    // GET /roles
    // Returns all of the existing roles
    getRoles(): Observable<string[]> {
        return this.http.get<string[]>(backend_roles);
    }

    isAdmin(user: User): boolean {
        if (user.roles.find(role => role === "Admin")) {
            return true;
        } else {
            return false;
        }
    }
}