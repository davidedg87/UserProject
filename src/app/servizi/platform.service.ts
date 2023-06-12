import { Injectable } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  /*
  private isMobileSubject!: BehaviorSubject<boolean>;
  public isMobile$!: Observable<boolean>;

  constructor(private renderer: Renderer2){

    this.isMobileSubject = new BehaviorSubject<boolean>(false);
    this.isMobile$ = this.isMobileSubject.asObservable();

    this.renderer.listen('window', 'resize', () => {
      this.checkViewport();
    });

    this.checkViewport();

  }

  private checkViewport() {
    const isMobile = window.innerWidth < 768; // Regola il valore 768 in base al breakpoint di Bootstrap per il mobile
    this.isMobileSubject.next(isMobile);
  }
  */
}
