import { Component, signal } from '@angular/core';
import { Games } from "../games/games";

@Component({
  selector: 'app-user',
  imports: [Games],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  username = 'cosmecín'
  isLoggedIn = signal(false)

  greet() {
    alert('Hola!!!')
  }
}
