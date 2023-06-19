import { Component, OnDestroy } from '@angular/core';
import {
  Subscription,
  debounce,
  debounceTime,
  fromEvent,
  throttleTime,
} from 'rxjs';
import { ResizeService } from 'src/app/servizi/resize.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnDestroy {
  private resizeSubscription!: Subscription;
  public isMobile : boolean = false;
  constructor(public resizeService: ResizeService) {}

  ngOnInit() {
    //Mi metto in ascolto dell'observable definito in resizeService creato con BehaviourSubject
    //Il BehaviourSubject è impostato per scattare ad ogni formResize
    this.resizeSubscription = this.resizeService.isMobile$.subscribe(
      (result) => {
        this.isMobile = result;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.resizeSubscription) this.resizeSubscription.unsubscribe();
  }
}
