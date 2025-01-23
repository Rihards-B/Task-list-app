import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { backend_groups } from "../constants/endpoints";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GroupService {
    constructor(private http: HttpClient) {};

    // GET /groups
    // Fetches all of the groups from BE
    getGroups(): Observable<string[]> {
        return this.http.get<string[]>(backend_groups);
    }

    // DELETE /groups/:groupName
    // Deletes a group by name from BE
    deleteGroup(groupName: string) {
        return this.http.delete(backend_groups + groupName);
    }

    // POST /groups/:groupName
    // Adds a group, groupName must be unique
    addGroup(groupName: string): Observable<string> {
        return this.http.post<string>(backend_groups + groupName, null);
    }

    // PUT /groups/:groupName/:newGroupName
    // Updates a group's name
    updateGroup(groupName: string, newGroupName: string): Observable<string> {
        return this.http.put<string>(backend_groups + groupName + '/' + newGroupName, null);
    }
}