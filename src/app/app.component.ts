import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(public authService: AuthService, public router: Router) { 
    if(this.authService.isLoggedIn) {
      this.router.navigate(['dashboard'])
    }
  }
  title = 'ThePassKeeper';
}
