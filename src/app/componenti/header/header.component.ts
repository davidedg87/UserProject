import { Component, HostListener  } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public isMobile! : boolean;
  constructor(){  }

  ngOnInit() {
    this.checkWindowSize();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.checkWindowSize();
  }

  private checkWindowSize() {
    this.isMobile  = window.innerWidth < 768;
  }

}
