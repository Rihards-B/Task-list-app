import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function PasswordsMatch(fieldToMatch: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.parent) {
            const matchingControl = (control.parent.controls as any)[fieldToMatch] as AbstractControl
            if (matchingControl.value === control.value) {
                return null;
            } else {
                return { passwordsDontMatch: true };
            }
        } else {
            return null;
        }
    };
}