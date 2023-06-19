import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, fromEvent, throttleTime } from 'rxjs';
import { FakeApiService } from 'src/app/servizi/fake-api.service';
import {  ResizeService } from 'src/app/servizi/resize.service';
import { User } from 'src/app/shared/user.interfaces';

@Component({
  selector: 'app-lista-utenti',
  templateUrl: './lista-utenti.component.html',
  styleUrls: ['./lista-utenti.component.css'],
})
export class ListaUtentiComponent implements OnInit, OnDestroy {
  private resizeSubscription!: Subscription;
  private fetchSubscription!: Subscription;
  public isMobile : boolean = false;
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['name', 'username', 'email'];
  users!: User[];

  constructor(
    private apiService: FakeApiService,
    public resizeService: ResizeService
  ) {
    this.dataSource = new MatTableDataSource<User>();
  }

  ngOnInit(): void {

    this.fetchUsers();

    //Mi metto in ascolto dell'observable definito in resizeService creato con BehaviourSubject
    //Il BehaviourSubject è impostato per scattare ad ogni formResize
    this.resizeSubscription = this.resizeService.isMobile$.subscribe(
      (result) => {
        this.isMobile = result;
      }
    );

  }

  fetchUsers() {
    this.fetchSubscription = this.apiService.getListUser().subscribe(
      (response) => {
        this.users = response;
        this.dataSource = new MatTableDataSource<User>(this.users);
      },
      (error) => {
        console.log(
          'Si è verificato un errore durante il recupero degli utenti:',
          error
        );
      }
    );
  }

  ngOnDestroy(): void {
    if (this.resizeSubscription) this.resizeSubscription.unsubscribe();
    if (this.fetchSubscription) this.fetchSubscription.unsubscribe();
  }
}
