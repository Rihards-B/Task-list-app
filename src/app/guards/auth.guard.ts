import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { AuthStore } from "../store/auth/auth.store";

export const loggedInGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    // Don't let the angular server make api calls that need authorization
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
        //const authStore = inject(AuthStore);
        //return authStore.isLoggedIn();
        return localStorage.getItem("isLoggedIn") == "true" ? true : false;
    } else {
        return false
    }
};

export const blockLoggedInUserGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    // Don't let the angular server make api calls that need authorization
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
        const authStore = inject(AuthStore);
        return !authStore.isLoggedIn();
    } else {
        return true
    }
};

