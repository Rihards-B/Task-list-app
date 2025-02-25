import { inject } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { GroupService } from "../sevices/group.service";
import { Observable, catchError, map, of } from "rxjs";

export function uniqueGroupName(): AsyncValidatorFn {
    const groupService = inject(GroupService);
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return groupService.getGroups().pipe(map(groups => (groups.includes(control.value) ? { groupTitleNotUnique: true } : null)));
    }
}