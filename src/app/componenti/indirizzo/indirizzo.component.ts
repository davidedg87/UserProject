import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { checkAddressField } from 'src/app/shared/custom.validator';

@Component({
  selector: 'app-indirizzo',
  templateUrl: './indirizzo.component.html',
  styleUrls: ['./indirizzo.component.css'],
})
export class IndirizzoComponent {
  // @Input() addressFormGroup!: FormGroup ; Non più utilizzato
  addressFormGroup!: FormGroup;

  constructor(public formBuilder: FormBuilder) {}

  public createGroup() {
    this.addressFormGroup = this.formBuilder.group({
      via: [''],
      citta: [''],
      numero: [''],
    }, {validators : checkAddressField('via','citta','numero')}  );//Validatore custom per cui tutti e tre i campi sono obbligatori se almeno uno è valorizzato

    return this.addressFormGroup;
  }
}
