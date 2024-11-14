import { Component } from '@angular/core';
import { AuthService } from '../services/auth_service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(private router: Router,private authService :AuthService){}

  onLogin() {
    if (this.validateCredentials()) {
      this.authService.login(this.username, this.password).subscribe({
        next: () => {
          this.router.navigateByUrl('/home');
        },
        error: () => {
          this.errorMessage = 'login failed, check your login and password';
        }
      });
    } else {
      this.errorMessage = 'login failed, check your login and password';
    }
  }

  validateCredentials(): boolean {
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password cannot be null or empty.';
      return false;
    }
    if (this.username.length < 8 || this.password.length < 8) {
         this.errorMessage = 'Username and password must be at least 8 characters long.';
      return false;
    }
    return true;
  }
}
