import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';


export function checkDateConsistency(
  firstField: string,
  secondField: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstDate: Date = control.get(firstField)?.value;
    const secondDate: Date = control.get(secondField)?.value;

    if (firstDate && secondDate) {
      const isRangeValid = secondDate.getTime() - firstDate.getTime() > 0;

      return isRangeValid ? null : { dateLessThan: true };
    }
    return null; //Validazione superata
  };
}
