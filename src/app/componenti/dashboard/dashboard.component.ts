import { Component } from '@angular/core';
import { PlatformService } from 'src/app/servizi/platform.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {



constructor(public platformService : PlatformService){

}


toggleSidenav() {
  // Logica per aprire/chiudere il menu
}


}
