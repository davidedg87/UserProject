import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, fromEvent, throttleTime } from 'rxjs';
import { FakeApiService } from 'src/app/servizi/fake-api.service';
import { FormService } from 'src/app/servizi/form.service';
import { User } from 'src/app/shared/user.interfaces';


@Component({
  selector: 'app-lista-utenti',
  templateUrl: './lista-utenti.component.html',
  styleUrls: ['./lista-utenti.component.css']
})
export class ListaUtentiComponent implements OnInit, OnDestroy {
  private formResize!: Subscription;
  private fetchSubscription!: Subscription;
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['name', 'username', 'email'];
  users! : User[];

    constructor(private apiService : FakeApiService, public formService : FormService){
      this.dataSource = new MatTableDataSource<User>();

    }

    ngOnInit(): void {
      this.formService.checkMobileView();
      this.fetchUsers();
      //fromEvent va a definire un evento sulla form che scatta al resize della window in questo caso
      //la pipe con throttleItem serve per andare a dire che deve esempre aspettare almeno 200 ms per far scattare la subscribe
      //anche se scattano più eventi di resize
      this.formResize = fromEvent( window, 'resize').pipe(throttleTime(200)).subscribe( () =>
      {
          console.log('resize');
          this.formService.checkMobileView();
      }
      )
    }

    fetchUsers() {
        this.fetchSubscription = this.apiService.getListUser()
          .subscribe(
            (response) => {
              this.users = response;
              this.dataSource = new MatTableDataSource<User>( this.users);
            },
            (error) => {
              console.log('Si è verificato un errore durante il recupero degli utenti:', error);
            }
          );
    }

    ngOnDestroy(): void {
      this.formResize.unsubscribe();
      this.fetchSubscription.unsubscribe();
    }



  }




