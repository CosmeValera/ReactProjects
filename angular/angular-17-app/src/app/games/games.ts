import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-games',
  imports: [],
  template: `
    <h3>Los juegos favoritos de {{ username }}</h3>
    <ul>
      @for (game of games; track game.id) {
        <li>{{ game.name }}</li>
      }
    </ul>
  `,
  styles: ``,
})
export class Games {
  @Input() username = ''

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
