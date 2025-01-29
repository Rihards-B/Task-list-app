import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { patchState, signalStoreFeature, withMethods } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop"
import { tapResponse } from "@ngrx/operators"
import { pipe, switchMap, tap } from "rxjs";
import { AuthDetails } from "src/app/models/auth-details.model";
import { User } from "src/app/models/user.model";
import { AuthService } from "src/app/sevices/auth.service";
import { UserService } from "src/app/sevices/user.service";
import { HttpErrorResponse } from "@angular/common/http";

export function withAuthSignalMethods() {
    return signalStoreFeature(
        withMethods((store, userService = inject(UserService), authService = inject(AuthService), router = inject(Router)) => {
            return {
                register: rxMethod<User>(
                    pipe(switchMap((user) => {
                        return authService.register(user).pipe(
                            tapResponse(
                                (response) => {
                                    patchState(store, { isLoggedIn: response.isLoggedIn, currentUser: response.user });
                                    router.navigateByUrl("/");
                                },
                                (error: HttpErrorResponse) => {
                                    console.log(error.error);
                                    patchState(store, { errors: error.error.messages });
                                }
                            )
                        )
                    }))
                ),
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
                            tapResponse(
                                (response) => {
                                    if (response.isLoggedIn) {
                                        console.log("Logging in with user: ", response.user);
                                        patchState(store, { isLoggedIn: true, currentUser: response.user });
                                        localStorage.setItem("isLoggedIn", "true")
                                        router.navigateByUrl("/");
                                    }
                                    if (response.errors) {
                                        patchState(store, { errors: response.errors });
                                    }
                                },
                                (error: HttpErrorResponse) => {
                                    console.log(error.error);
                                    patchState(store, { errors: error.error.messages });
                                }
                            )
                        )
                    }))
                ),
                loadCurrentUser: rxMethod<void>(
                    pipe(switchMap(() => {
                        return userService.getCurrentUser().pipe(
                            tapResponse(
                                (user) => {
                                    console.log("Got current user: ", user);
                                    patchState(store, { isLoggedIn: true, currentUser: user });
                                },
                                (error: HttpErrorResponse) => {
                                    console.log("Error getting current user");
                                    patchState(store, { isLoggedIn: false, currentUser: null });
                                }
                            )
                        )
                    })
                    )
                )
            }
        })
    )
}