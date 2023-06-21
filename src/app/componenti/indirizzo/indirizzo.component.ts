import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupName,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'app-indirizzo',
  templateUrl: './indirizzo.component.html',
  styleUrls: ['./indirizzo.component.css'],
})
export class IndirizzoComponent implements OnInit {
  @Input() addressFormGroup!: FormGroup; // Non più utilizzato
  //addressFormGroup!: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    //Inizializzazione formGroup vuoto
    this.addressFormGroup = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.addressFormGroup.statusChanges.subscribe((value) => {
      console.log('IndirizzoForm Status', value);
    });

    this.addressFormGroup.addControl(
      'via',
      this.formBuilder.control(null, []),
      { emitEvent: false }
    );
    this.addressFormGroup.addControl(
      'citta',
      this.formBuilder.control(null, []),
      { emitEvent: false }
    );
    this.addressFormGroup.addControl(
      'numero',
      this.formBuilder.control(null, []),
      { emitEvent: false }
    );
    this.addressFormGroup.addValidators([this.checkAddressField()]); //Aggiunge senza sostituire
  }

  /* Non più utilizzato. Il form viene creato vuoto nel padre e inizializzato direttamente nel figlio sull'OnInit
  public createGroup() {
    this.addressFormGroup = this.formBuilder.group(
      {
        via: [''],
        citta: [''],
        numero: [''],
      },
      { validators: [checkAddressField('via', 'citta', 'numero')] }
    ); //Validatore custom per cui tutti e tre i campi sono obbligatori se almeno uno è valorizzato

    return this.addressFormGroup;
  }
*/
  //Torna true se siamo nella situazione di un componente popolato ma non tutti i componenti sono popolati ed uno dei componenti non popolati è quello in input
  checkAddressFieldMissing(fieldname: string): boolean {
    const error = this.addressFormGroup.getError('addressFieldMissing');
    return error && error[fieldname];
  }

  //Torna true se siamo nella situazione di un componente popolato ma non tutti i componenti sono popolati
  checkAddressNotCompleted() {
    return this.addressFormGroup.getError('addressFieldMissing');
  }

  //Validatore custom per campi indirizzo
  checkAddressField(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const firstFieldValue = control.get('via')?.value;
      const secondFieldValue = control.get('citta')?.value;
      const thirdFieldValue = control.get('numero')?.value;

      const err: any = {};

      //Se uno dei tre campi è valorizzato allora devono esserlo tutti e tre
      if (firstFieldValue || secondFieldValue || thirdFieldValue) {
        if (!firstFieldValue || !secondFieldValue || !thirdFieldValue) {
          if (!firstFieldValue) {
            //control.get(firstField)?.setErrors({ addressFieldMissing: true });
            err['via'] = true;
          }

          if (!secondFieldValue) {
            err['citta'] = true;
          }

          if (!thirdFieldValue) {
            err['numero'] = true;
          }

          //Non passo true ma un dizionario con [field : true] se il campo è assente
          //Viene poi utilizzato nel metodo checkAddressFieldMissing
          return { addressFieldMissing: err };
        }
      }

      return null; //Validazione superata
    };
  }
}
