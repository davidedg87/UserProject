import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResizeService {
  public isMobile!: boolean;
  public isDesktop!: boolean;
  constructor() {}

  checkMobileView() {
    this.isMobile = window.innerWidth < 768;
    this.isDesktop = !this.isMobile;
  }
}
