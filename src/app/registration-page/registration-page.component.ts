import { Component } from '@angular/core';
import { AuthService } from '../services/auth_service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})

export class RegistrationPageComponent {
  username: string = '';
  password: string = ''; 
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  onRegister() {
    if (this.validateCredentials()) {
      this.authService.register(this.username, this.password).subscribe({
        next: () => {
          this.router.navigateByUrl('/login');
        },
        error: () => {
          this.errorMessage = 'Registration failed, may be user has already exists';
        }
      });
    } else {
      console.error('Invalid username or password');
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
