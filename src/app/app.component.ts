import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isAuthenticated.subscribe((value) => {
      this.isAuthenticated = value;
      if (!value) {
        void this.router.navigate(['/login'], { replaceUrl: true });
      }
    });
  }
}
