import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {


  constructor(private authService: AuthService) {
  }

  isLoggedIn(){
    return this.authService.isLoggedIn()
  }
}
