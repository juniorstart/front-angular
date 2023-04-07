import { Component } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {


  constructor(private authService: AuthService) {
  }

  isLoggedIn(){
    return this.authService.isLoggedIn()
  }

  logout(){
    return this.authService.logout()
  }

}
