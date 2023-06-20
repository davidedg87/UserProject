import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function checkAddressField(
  firstField: string,
  secondField: string,
  thirdField: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstFieldValue = control.get(firstField)?.value;
    const secondFieldValue = control.get(secondField)?.value;
    const thirdFieldValue = control.get(thirdField)?.value;

    //Se uno dei tre campi è valorizzato allora devono esserlo tutti e tre
    if (firstFieldValue || secondFieldValue || thirdFieldValue) {
      if (!firstFieldValue || !secondFieldValue || !thirdFieldValue) {
        if (!firstFieldValue)
          control.get(firstField)?.setErrors({ addressFieldMissing: true });
        else control.get(firstField)?.setErrors(null);

        if (!secondFieldValue)
          control.get(secondField)?.setErrors({ addressFieldMissing: true });
        else control.get(secondField)?.setErrors(null);

        if (!thirdFieldValue)
          control.get(thirdField)?.setErrors({ addressFieldMissing: true });
        else control.get(thirdField)?.setErrors(null);

        return { addressFieldMissing: true };
      }
    }

    control.get(firstField)?.setErrors(null);
    control.get(secondField)?.setErrors(null);
    control.get(thirdField)?.setErrors(null);

    return null; //Validazione superata
  };
}

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
