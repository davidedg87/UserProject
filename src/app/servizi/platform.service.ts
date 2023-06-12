import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  public isDesktop: boolean;
  public isMobile: boolean;

  constructor(){

    this.isMobile =   false;
    this.isDesktop = true;



  }
}
