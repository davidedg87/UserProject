import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../shared/user.interfaces';

@Injectable({
  providedIn: 'root'
})
export class FakeApiService {

  constructor(private http : HttpClient) { }

  url = 'https://jsonplaceholder.typicode.com/users'

  saveUser(url : string, body: User){

    return this.http.post(url,body)
  }

  getListUser(url : string){


    return this.http.get<User[]>(url);

  }


}
