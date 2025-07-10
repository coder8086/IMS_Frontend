import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService, AuthRequest } from '../../../Services/AuthenticationService/authentication.service';
import { FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Fixed the typo
})
export class LoginComponent {
  
  loginData: AuthRequest = {
    username: '',
    password: ''
  };

  showPassword: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  onLogin() {
    if (this.loginData.username && this.loginData.password) {
      this.authenticationService.login(this.loginData).subscribe({
        next: (res) => {
          alert('Login Successful!');

          // Save token to localStorage (or sessionStorage)
          localStorage.setItem('token', res);


          // Navigate to home/dashboard
          this.router.navigate(['/electronics-store-home']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          alert('Invalid credentials, please try again.');
        }
      });
    } else {
      alert('Please fill in all fields.');
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
