import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FakeApiService } from 'src/app/servizi/fake-api.service';
import { PopupComponent } from '../popup/popup.component';
import { User } from 'src/app/shared/user.interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aggiungi-utente',
  templateUrl: './aggiungi-utente.component.html',
  styleUrls: ['./aggiungi-utente.component.css']
})
export class AggiungiUtenteComponent implements OnInit, OnDestroy , AfterViewInit {
  //Definizione viewChild per accedere a proprietà del DOM. In questo caso su H2
  @ViewChild('aggiungiUtenteH2') aggiungiUtenteH2!: ElementRef<HTMLHeadingElement>;


  //Definisco form di tipo FormGroup
  form!: FormGroup;
  private saveSubscription!: Subscription;

  //Passaggio a costruttore di FormBuilder per dependency injection
  constructor(private formBuilder : FormBuilder,
              private apiService : FakeApiService,
              public dialog: MatDialog
              ) {}


  ngAfterViewInit(): void {
    //Posso accedere all'elemento del DOM avendo definito come ViewChild della proprietà

    console.log('aggiungiUtenteH2', this.aggiungiUtenteH2);
    this.aggiungiUtenteH2.nativeElement.innerHTML = 'aggiungiUtenteH2'
  }


  ngOnInit(): void {
    console.log('aggiungiUtenteH2', this.aggiungiUtenteH2);//Undefined in quanto non ancora caricato
    //Inizializzo il form andando ad indicare quali saranno i campi che lo compongono con i vari validatori
    this.form = this.formBuilder.group (
      {
      nome : ['', Validators.required],
      email : ['',[Validators.required, Validators.email]],
      username : ['', Validators.required],
      telefono : ['', Validators.required]
      }

    )

    this.form.valueChanges.subscribe(
      (value) => {
          console.log('valuechanges' ,value )

      }
    )

    this.form.statusChanges.subscribe(
      (value) => {
          console.log('statusChanges' ,value )

      }
    )


  }

  onSubmit()
  {
    //const formValue = this.form.value //Prende solo i campi abilitati
    const formValue = this.form.getRawValue() //Prende anche i campi disabilitati
    const {nome, email } = this.form.value
    const newUser : User = {
      //name : this.form.get('nome')!.value,
      name : nome,
      email : email,
      username : formValue.username,
      telefono : formValue.telefono
    }

    this.saveSubscription = this.apiService.saveUser(newUser).subscribe(
      (response) => {
        this.openDialog('Info', 'Utente inserito correttamente');
        console.log('Utente inserito correttamente');
      },
      (error) => {
        this.openDialog('Error', `Si è verificato un errore durante il salvataggio dell utente`);
        console.log(`Si è verificato un errore durante il salvataggio dell utente :`, error);
      }
    );
  }


  onReset() {
    this.form.markAsPristine()
    this.form.markAsUntouched()
    this.form.reset();




  }

  /*
  toggle(){

    if( this.form.get('nome')!.disabled)
      this.form.get('nome')!.enable();
    else
    this.form.get('nome')!.disable({
        //emitEvent : false --> Evito di emettere evento a seguito della modifica
          onlySelf : true

    });

    this.form.updateValueAndValidity();


  }
*/

  openDialog(tipo : string, messaggio : string) {

    const dialogRef: MatDialogRef<PopupComponent> = this.dialog.open(PopupComponent, {
      width: '300px',
      data: { tipo : tipo, message: messaggio }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Il popup è stato chiuso');
      this.onReset();
    });

  }

  ngOnDestroy(): void {
    if (this.saveSubscription)
      this.saveSubscription.unsubscribe();
  }



}
