import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { User } from "../models/user";
import { UserService } from "../sevices/user.service";

export const UserResolver: ResolveFn<User> = (
    route: ActivatedRouteSnapshot,
) => {
    const id: string = route.paramMap.get('id') || ' ';
    console.log("Getting user with ID:", id);
    const userService = inject(UserService);
    return userService.getUser(id);
}