import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { patchState, signalStoreFeature, withMethods } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop"
import { SlowBuffer } from "buffer";
import { lastValueFrom, pipe, switchMap, tap } from "rxjs";
import { AuthDetails } from "src/app/models/auth-details.model";
import { AuthStatus } from "src/app/models/auth-status.model";
import { User } from "src/app/models/user.model";
import { AuthService } from "src/app/sevices/auth.service";
import { UserService } from "src/app/sevices/user.service";

export function withAuthSignalMethods() {
    return signalStoreFeature(
        withMethods((store, userService = inject(UserService), authService = inject(AuthService), router = inject(Router)) => {
            return {
                logout: rxMethod<void>(
                    pipe(switchMap(() => {
                        return authService.logout().pipe(
                            tap(() => {
                                console.log("Logging out!");
                                patchState(store, { isLoggedIn: false, currentUser: null });
                                router.navigateByUrl("/login");
                            })
                        )
                    }))
                ),
                login: rxMethod<AuthDetails>(
                    pipe(switchMap((authdetails) => {
                        return authService.login(authdetails).pipe(
                            tap({
                                next: (response) => {
                                    if (response.isLoggedIn) {
                                        console.log("Logging in with user: ", response.user);
                                        patchState(store, { isLoggedIn: true, currentUser: response.user });
                                        localStorage.setItem("isLoggedIn", "true")
                                        router.navigateByUrl("/");
                                    }
                                },
                                error: (error) => {
                                    console.log(error);
                                }

                            })
                        )
                    }))
                ),
                loadCurrentUser: rxMethod<void>(
                    pipe(switchMap(() => {
                        return userService.getCurrentUser().pipe(
                            tap({
                                next: (user) => {
                                    console.log("Got current user: ", user);
                                    patchState(store, { isLoggedIn: true, currentUser: user });
                                },
                                error: (error) => {
                                    console.log("Error getting current user");
                                    patchState(store, { isLoggedIn: false, currentUser: null });
                                }
                            })
                        )
                    })
                    )
                )
            }
        })
    )
}