import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <h1>Hola {{city}}</h1>
    <h2>Esto es {{appName()}}</h2>
  `,
  styles: `h1 {color: green}`
})
export class App {
  city = "Murcia";
  appName = signal('angular-17-app');
}
