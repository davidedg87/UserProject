import { Component , HostListener ,ElementRef, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
public isDesktop! : boolean;


  constructor(private elementRef: ElementRef){ }


  ngOnInit() {
    this.checkWindowSize();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.checkWindowSize();
  }

  private checkWindowSize() {
    this.isDesktop  = !(window.innerWidth < 768);
  }


}
