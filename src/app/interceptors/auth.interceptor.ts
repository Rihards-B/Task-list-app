import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { Inject, inject, PLATFORM_ID } from "@angular/core";
import { tap } from "rxjs";
import { Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const request = req.clone({
        withCredentials: true,
    })
    return next(request).pipe(tap({
        next: () => {},
        error: (error) => {
            if (error instanceof HttpErrorResponse && isPlatformBrowser(Inject(PLATFORM_ID))) {
                if (error.status === 401 && !window.location.href.endsWith("login")) {
                    router.navigateByUrl('401');
                }
            }
        }
    }))
}