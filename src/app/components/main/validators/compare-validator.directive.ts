import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn} from '@angular/forms';
import {Subscription} from 'rxjs';

export function CompareValidator(compare: string): ValidatorFn {
return (control: AbstractControl): ValidationErrors | null => {
  if (control.value === null || control.value.length === 0) {
    return null;
  }
  const controlToCompare = control.root.get(compare);
  if (controlToCompare) {
    const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
      control.updateValueAndValidity();
      subscription.unsubscribe();
    });
  }
  return controlToCompare && controlToCompare.value !== control.value ? { compare: true } : null;
};
}
@Directive({
  selector: '[appCompare]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CompareValidatorDirective,
    multi: true
  }]
})
export class CompareValidatorDirective {

  constructor() { }

}
