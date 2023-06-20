import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  checkAddressField,
  checkDateConsistency,
} from 'src/app/shared/custom.validator';

@Component({
  selector: 'app-indirizzo',
  templateUrl: './indirizzo.component.html',
  styleUrls: ['./indirizzo.component.css'],
})
export class IndirizzoComponent implements OnInit {
  // @Input() addressFormGroup!: FormGroup ; Non più utilizzato
  addressFormGroup!: FormGroup;

  constructor(public formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.addressFormGroup.statusChanges.subscribe((value) => {
      console.log('IndirizzoForm Status', value);
    });
  }

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

  checkAddressFieldMissing(field: string): boolean {
    if (
      this.addressFormGroup &&
      this.addressFormGroup.controls &&
      this.addressFormGroup.controls[field] &&
      this.addressFormGroup.controls[field].errors &&
      this.addressFormGroup.controls[field].errors!['addressFieldMissing']
    ) {
      return true;
    }

    return false;
  }
}
