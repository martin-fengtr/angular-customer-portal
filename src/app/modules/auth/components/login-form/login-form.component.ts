import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  email = '';
  password = '';
  isLoading = false;
  error = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    try {
      this.isLoading = true;
      this.error = '';
      await this.authService.login(this.email, this.password);
    } catch (error) {
      this.error = error.message ?? error;
    } finally {
      this.isLoading = false;
    }
  }
}
