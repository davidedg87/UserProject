import { Component, OnInit, HostListener } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FakeApiService } from 'src/app/servizi/fake-api.service';
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
  public isMobile! : boolean;

    constructor(private apiService : FakeApiService){
      this.dataSource = new MatTableDataSource<User>();

    }
    ngOnInit(): void {
      this.checkWindowSize();
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

    @HostListener('window:resize')
    onWindowResize() {
      this.checkWindowSize();
    }

    private checkWindowSize() {
      this.isMobile  = window.innerWidth < 768;
    }

  }




