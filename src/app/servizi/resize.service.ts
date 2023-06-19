import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, throttleTime } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResizeService  {
  //BeahvourSubject con valore iniziale a false
  public isMobile$ = new BehaviorSubject(false);

  constructor() {
    //fromEvent va a definire un evento sulla form che scatta al resize della window in questo caso
    //la pipe con throttleItem serve per andare a dire che deve esempre aspettare almeno 200 ms per far scattare la subscribe
    //anche se scattano più eventi di resize
    //Imposto la creazione del subscribe al formEvent sul costruttore in quanto sui servizi non posso usare l'init
    fromEvent(window, 'resize')
      .pipe(throttleTime(200))
      .subscribe(() => {
        console.log('fromEvent')
        this.checkMobileView();
      });
  }


  checkMobileView() {
    if (window.innerWidth < 768) this.isMobile$.next(true);
    else this.isMobile$.next(false);
  }
}
