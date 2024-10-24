import { isPlatformBrowser } from "@angular/common";
import { inject, PLATFORM_ID } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../sevices/user.service";
import { RoleService } from "../sevices/role.service";
import { concatMap, filter, Observable, of } from "rxjs";

export const isAdminGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
): Observable<boolean> => {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
        const userService = inject(UserService);
        const roleService = inject(RoleService);
        return userService.currentUserSubject.asObservable().pipe(
            filter(currentUser => currentUser !== undefined),
            concatMap(currentUser => roleService.isAdmin(currentUser))
        )
    } else {
        return of(false);
    }
}