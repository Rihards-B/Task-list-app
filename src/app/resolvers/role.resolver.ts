import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { RoleService } from "../sevices/role.service";

export const RoleResolver: ResolveFn<string[]> = (
    route: ActivatedRouteSnapshot,
) => {
    const roleService = inject(RoleService);
    return roleService.getRoles();
}