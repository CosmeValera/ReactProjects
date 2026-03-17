import { Component } from '@angular/core';

@Component({
  selector: 'app-games',
  imports: [],
  template: `
    <ul>
      @for (game of games; track game.id) {
        <li>{{ game.name }}</li>
      }
    </ul>
  `,
  styles: ``,
})
export class Games {
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
