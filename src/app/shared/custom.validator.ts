import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

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
        const err = { testValidatorCustom: true };
        return err;
      }
    }

    return null; //Validazione superata

  };
}
