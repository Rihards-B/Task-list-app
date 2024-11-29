import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { patchState, signalStoreFeature, withMethods } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop"
import { SlowBuffer } from "buffer";
import { lastValueFrom, pipe, switchMap, tap } from "rxjs";
import { authDetails } from "src/app/models/authDetails";
import { authStatus } from "src/app/models/authStatus";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/sevices/auth.service";
import { UserService } from "src/app/sevices/user.service";

export function withAuthSignalMethods() {
    return signalStoreFeature(
        withMethods((store, userService = inject(UserService), authService = inject(AuthService), router = inject(Router)) => {
            return {
                login: rxMethod<authDetails>(
                    pipe(switchMap((authdetails) => {
                        return authService.login(authdetails).pipe(
                            tap({
                                next: (response) => {
                                    if (response.isLoggedIn) {
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
                            tap((user: User) => {
                                console.log("Got current user: ", user);
                                patchState(store, { isLoggedIn: true, currentUser: user })
                            })
                        )
                    })
                    )
                )
            }
        })
    )
}