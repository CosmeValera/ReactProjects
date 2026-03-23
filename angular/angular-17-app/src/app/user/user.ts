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
  favGame = '';

  getFavorite(gameName: string) {
    this.favGame = gameName
  }

  greet() {
    alert("hola " + this.username)
  }
}
