import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { GroupService } from "../sevices/group.service";

export const GroupResolver: ResolveFn<string[]> = (
    route: ActivatedRouteSnapshot,
) => {
    const groupService = inject(GroupService);
    return groupService.getGroups();
}