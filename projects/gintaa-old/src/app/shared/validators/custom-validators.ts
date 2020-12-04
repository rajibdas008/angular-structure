import { ValidatorFn, AbstractControl } from '@angular/forms';

export function NumericValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        // if (control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max)) {
        //     return { 'ageRange': true };
        // }
        return null;
    };
}