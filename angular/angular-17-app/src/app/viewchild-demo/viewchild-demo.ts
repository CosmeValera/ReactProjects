import { Component, ViewChild, ViewChildren, QueryList, ElementRef, AfterViewInit, signal } from '@angular/core';
import { GameCard } from './game-card/game-card';

@Component({
  selector: 'app-viewchild-demo',
  imports: [GameCard],
  template: `
    <h2>ViewChild Demo</h2>

    <!-- ===== @ViewChild: single DOM element ===== -->
    <h3>@ViewChild: focus a DOM element</h3>
    <input #myInput placeholder="I will get focused" />
    <button (click)="focusInput()">Focus input</button>

    <!-- ===== @ViewChild: single component instance ===== -->
    <h3>@ViewChild: call a method on a child component</h3>
    <app-game-card #firstCard name="Uncharted 4" />
    <button (click)="highlightFirst()">Highlight Uncharted 4</button>

    <!-- ===== @ViewChildren: multiple component instances ===== -->
    <h3>@ViewChildren: call a method on all child components</h3>
    @for (game of games; track game.id) {
      <app-game-card #gameCards [name]="game.name" />
    }
    <button (click)="highlightAll()">Highlight all</button>
    <button (click)="logAll()">Log all to console</button>
  `,
})
export class ViewchildDemo implements AfterViewInit {
  games = [
    { id: 1, name: 'Uncharted 4' },
    { id: 2, name: 'Horizon 4' },
    { id: 3, name: 'Bloodborne' },
  ]

  // @ViewChild: single DOM element via template ref #myInput
  @ViewChild('myInput') inputRef!: ElementRef

  // @ViewChild: single component instance via template ref #firstCard
  @ViewChild('firstCard') firstCard!: GameCard

  // @ViewChildren: all app-game-card instances (the QueryList updates if the list changes)
  @ViewChildren('gameCards') gameCards!: QueryList<GameCard>

  ngAfterViewInit() {
    // only available from here onwards — DOM doesn't exist before this
    console.log('input element:', this.inputRef.nativeElement)
    console.log('first card component:', this.firstCard)
    console.log('all cards:', this.gameCards.length)
  }

  focusInput() {
    this.inputRef.nativeElement.focus()
  }

  highlightFirst() {
    this.firstCard.highlight() // 👈 calling a method directly on the child component
  }

  highlightAll() {
    this.gameCards.forEach(card => card.highlight())
  }

  logAll() {
    this.gameCards.forEach(card => console.log(card.name()))
  }
}