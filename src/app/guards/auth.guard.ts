import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { AuthStore } from "../store/auth/auth.store";
import { filter, map, Observable, of } from "rxjs";
import { toObservable } from "@angular/core/rxjs-interop";

export const loggedInGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
): Observable<boolean> => {
    // Don't let the angular server make api calls that need authorization
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
        const authStore = inject(AuthStore);
        const router = inject(Router);

        const isloggedin$ = toObservable(authStore.isLoggedIn);

        return isloggedin$.pipe(
            filter(value => value !== null),
            map((value) => {
                if (!value) {
                    router.navigateByUrl("/login")
                } else {
                    return true;
                }
                return false;
            })
        )
    } else {
        return of(false)
    }
};

export const blockLoggedInUserGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    // Don't let the angular server make api calls that need authorization
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
        const authStore = inject(AuthStore);

        const isloggedin$ = toObservable(authStore.isLoggedIn);

        return isloggedin$.pipe(
            filter(value => value !== null),
            map((value) => {
                return value ? false : true;
            })
        )
    } else {
        return true
    }
};