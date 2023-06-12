import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  styleUrls: ['./menu-mobile.component.css']
})
export class MenuMobileComponent {

  constructor(private router: Router){
  }

  navigateToRoute(route: string) {
    this.router.navigate([route]);
  }


}
