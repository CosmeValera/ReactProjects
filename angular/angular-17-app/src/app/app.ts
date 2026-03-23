import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/login">Login</a>
      <a routerLink="/user">User</a>
    </nav>
    <router-outlet></router-outlet> <!-- 👈 renders the matched component here -->
  `,
  styles: `
    h1 { color: green; }
    a { padding: 2rem; }
  `
})
export class App { }
