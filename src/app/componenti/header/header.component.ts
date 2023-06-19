import { Component, OnDestroy } from '@angular/core';
import {
  Subscription,
  debounce,
  debounceTime,
  fromEvent,
  throttleTime,
} from 'rxjs';
import { ResizeService } from 'src/app/servizi/form.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnDestroy {
  private formResizeSubscription!: Subscription;
  constructor(public resizeService: ResizeService) {}

  ngOnInit() {
    this.resizeService.checkMobileView();
    //fromEvent va a definire un evento sulla form che scatta al resize della window in questo caso
    //la pipe con throttleItem serve per andare a dire che deve esempre aspettare almeno 200 ms per far scattare la subscribe
    //anche se scattano più eventi di resize
    this.formResizeSubscription = fromEvent(window, 'resize')
      .pipe(throttleTime(200))
      .subscribe(() => {
        console.log('resize');
        this.resizeService.checkMobileView();
      });
  }

  ngOnDestroy(): void {
    if (this.formResizeSubscription) this.formResizeSubscription.unsubscribe();
  }
}
