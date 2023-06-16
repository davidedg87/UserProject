import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../shared/user.interfaces';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeApiService {

  constructor(private http : HttpClient) { }

  url = 'https://jsonplaceholder.typicode.com/users'

  saveUser(body: User){

    return this.http.post(this.url,body)
  }

  getListUser() : Observable<User[]>{

    //Tap non ha alcun effetto se non quello di recuperare i dati che arrivano dalla chiamata all'api per poterli ad esempio stampare
    return this.http.get<User[]>(this.url).pipe(tap((data) => {

        console.log('data', data);


    } ));

  }


}
