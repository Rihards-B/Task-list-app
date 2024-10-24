import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { Role } from "../models/role.model";
import { RoleService } from "../sevices/role.service";

export const RoleResolver: ResolveFn<Role[]> = (
    route: ActivatedRouteSnapshot,
) => {
    const roleService = inject(RoleService);
    return roleService.getRoles();
}