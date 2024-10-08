import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, take, ReplaySubject, Subject, map } from "rxjs";
import { Role } from "../models/role-model";
import { backend_roles } from "../constants/endpoints";
import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    availableRolesSubject: Subject<Role[]> = new ReplaySubject<Role[]>();

    constructor(private http: HttpClient) {
        this.getRoles().pipe(take(1)).subscribe(roles => {
            this.availableRolesSubject.next(roles);
        })
    }

    // GET /roles
    // Returns all of the existing roles
    getRoles(): Observable<Role[]> {
        return this.http.get<Role[]>(backend_roles);
    }

    isAdmin(user: User): Observable<boolean> {
        return this.availableRolesSubject.asObservable().pipe(
            map(roles => {
                const adminRole: Role | undefined = roles.find(role => role.role_name === "Admin");
                if (adminRole && user.roles.find(role => role._id === adminRole._id)) {
                    return true;
                } else {
                    return false;
                }
            })
        )
    }
}