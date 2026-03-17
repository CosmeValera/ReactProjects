import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './user/user'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, User],
  template: `
    <app-user />
  `,
  styles: `h1 {color: green}`
})
export class App {
  city = "Murcia";
  appName = signal('angular-17-app');
}
