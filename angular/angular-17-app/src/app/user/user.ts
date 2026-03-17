import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-user',
  imports: [],
  template: `
    @if (isLoggedIn()) {
      <p>Bienvenido, {{ username }}</p>
    } @else {
      <p>¡Iniciá sesión!</p>
    }
  `,
  styleUrl: './user.css',
})
export class User {
  username = 'midudev'
  isLoggedIn = signal(true)
}
