import { Component  ,ElementRef, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { fromEvent, throttleTime } from 'rxjs';
import { FormService } from 'src/app/servizi/form.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private elementRef: ElementRef, public formService : FormService){ }


  ngOnInit() {
    this.formService.checkMobileView();
    //fromEvent va a definire un evento sulla form che scatta al resize della window in questo caso
    //la pipe con throttleItem serve per andare a dire che deve esempre aspettare almeno 200 ms per far scattare la subscribe
    //anche se scattano più eventi di resize
    fromEvent( window, 'resize').pipe(throttleTime(200)).subscribe( () =>
      {
          console.log('resize');
          this.formService.checkMobileView();
      }
      )
  }


}
