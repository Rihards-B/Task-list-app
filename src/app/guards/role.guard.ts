import { isPlatformBrowser } from "@angular/common";
import { inject, PLATFORM_ID } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { RoleService } from "../sevices/role.service";
import { Observable, of } from "rxjs";
import { AuthStore } from "../store/auth/auth.store";
import { User } from "../models/user.model";

export const isAdminGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
): Observable<boolean> => {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
        const authStore = inject(AuthStore)
        const roleService = inject(RoleService);

        const currentUser: User | null = authStore.currentUser();

        if (currentUser) {
            console.log("Returning is admin check with user: ", currentUser);
            return roleService.isAdmin(currentUser);
        } else {
            console.log("Returning no user");
            return of(false);
        }
    } else {
        return of(false);
    }
}