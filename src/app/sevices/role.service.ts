import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { BACKEND_ROLES } from "../constants/endpoints";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    constructor(private http: HttpClient) {}

    // GET /roles
    // Returns all of the existing roles
    getRoles(): Observable<string[]> {
        return this.http.get<string[]>(BACKEND_ROLES);
    }

    hasRole(user: User, roleName: string) {
        return user.roles.find(role => role === roleName) ? true : false;
    }

    isAdmin(user: User): boolean {
        if (user.roles.find(role => role === "Admin")) {
            return true;
        } else {
            return false;
        }
    }
}