import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';


@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  public isDesktop: boolean;
  public isMobile: boolean;

  constructor(private deviceService: DeviceDetectorService){

    this.isMobile =   this.deviceService.isMobile();
    this.isDesktop = !this.isMobile;



  }
}
