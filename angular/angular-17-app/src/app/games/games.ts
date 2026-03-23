import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { GameService } from '../services/game';

@Component({
  selector: 'app-games',
  imports: [],
  template: `
    <h3>Los juegos favoritos de {{ username }}</h3>
    <ul>
      @for (game of games(); track game.id) {
        <li (click)="fav(game.name)">{{ game.name }}</li>
      }
    </ul>
  `,
  styles: ``,
})
export class Games {
  @Input() username = '';
  @Output() addFavoriteEvent = new EventEmitter<string>();

  private gameService = inject(GameService)
  games = this.gameService.games;

  fav(gamename: string) {
    this.addFavoriteEvent.emit(gamename)
  }
}
