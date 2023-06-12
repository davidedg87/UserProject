import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FakeApiService } from 'src/app/servizi/fake-api.service';
import { PlatformService } from 'src/app/servizi/platform.service';
import { User } from 'src/app/shared/user.interfaces';


@Component({
  selector: 'app-lista-utenti',
  templateUrl: './lista-utenti.component.html',
  styleUrls: ['./lista-utenti.component.css']
})
export class ListaUtentiComponent implements OnInit {
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['name', 'username', 'email'];
  users! : User[];

    constructor(private apiService : FakeApiService, public platformService : PlatformService){
      this.dataSource = new MatTableDataSource<User>();

    }
    ngOnInit(): void {

      this.fetchUsers();
    }

    fetchUsers() {
        this.apiService.getListUser(this.apiService.url)
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
  }




