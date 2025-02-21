import { isPlatformBrowser } from "@angular/common";
import { inject, PLATFORM_ID } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { RoleService } from "../sevices/role.service";
import { Observable, of, map, tap, filter } from "rxjs";
import { AuthStore } from "../store/auth/auth.store";
import { toObservable } from "@angular/core/rxjs-interop";

export const isAdminGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
): Observable<boolean> => {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
        const authStore = inject(AuthStore)
        const roleService = inject(RoleService);

        const currentUser$ = toObservable(authStore.currentUser);

        return currentUser$.pipe(
            filter(user => user != null),
            map(user => {
                return roleService.isAdmin(user);
            })
        )
    } else {
        return of(false);
    }
}