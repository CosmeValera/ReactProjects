import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-games',
  imports: [],
  template: `
    <h3>Los juegos favoritos de {{ username }}</h3>
    <ul>
      @for (game of games; track game.id) {
        <li (click)="fav(game.name)">{{ game.name }}</li>
      }
    </ul>
  `,
  styles: ``,
})
export class Games {
  @Input() username = '';
  @Output() addFavoriteEvent = new EventEmitter<string>();

  fav(gamename: string) {
    this.addFavoriteEvent.emit(gamename)
  }

  games = [
    {
      id: 1,
      name: 'Uncharted 4'
    },
    {
      id: 2,
      name: 'Horizon 4'
    },
    {
      id: 3,
      name: 'Bloodborne'
    }
  ]
}
