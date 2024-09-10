import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

export const canActivateLoggedIn: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    // Don't let the angular server make api calls that need authorization
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
        return sessionStorage.getItem("isLoggedIn") ? true : false;
    } else {
        return false
    }
};

export const canActivateIsLoggedIn: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    // Don't let the angular server make api calls that need authorization
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
        return sessionStorage.getItem("isLoggedIn") ? false : true;
    } else {
        return true
    }
};

