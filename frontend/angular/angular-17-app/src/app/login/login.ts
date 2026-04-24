import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  template: `
    <h2>Login</h2>
    <button (click)="login()">Iniciar sesión</button>`,
  styles: ``,
})
export class Login {
  private authService = inject(AuthService)
  private router = inject(Router)

  login() {
    this.authService.login()
    this.router.navigate(['/user'])
  }
}
