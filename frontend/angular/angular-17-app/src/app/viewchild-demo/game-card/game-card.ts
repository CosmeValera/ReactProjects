import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-game-card',
  imports: [],
  template: `
    <div [style.border]="highlighted() ? '2px solid gold' : '2px solid transparent'">
      {{ name() }}
    </div>
  `,
  styles: `div { padding: 8px; margin: 4px; display: inline-block; }`
})
export class GameCard {
  name = input('')
  highlighted = signal(false)

  highlight() {
    this.highlighted.set(true)
    setTimeout(() => this.highlighted.set(false), 1000)
  }
}