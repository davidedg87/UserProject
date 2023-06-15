import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class AggiungiUtenteComponent implements OnInit, OnDestroy {
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  //Definisco form di tipo FormGroup
  form!: FormGroup;
  private saveSubscription!: Subscription;

  //Passaggio a costruttore di FormBuilder per dependency injection
  constructor(private formBuilder : FormBuilder,
              private apiService : FakeApiService,
              public dialog: MatDialog
              ) {}


  ngOnInit(): void {

    //Inizializzo il form andando ad indicare quali saranno i campi che lo compongono con i vari validatori
    this.form = this.formBuilder.group (
      {
      nome : ['', Validators.required],
      email : ['',[Validators.required, Validators.email]],
      username : ['', Validators.required],
      telefono : ['', Validators.required]
      }

    )
  }

  onSubmit()
  {
    const newUser : User = {
      name : this.form.get('nome')!.value,
      email : this.form.get('email')!.value,
      username : this.form.get('username')!.value,
      telefono : this.form.get('telefono')!.value
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
    this.form.reset();
    this.formGroupDirective.resetForm();
  }


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
