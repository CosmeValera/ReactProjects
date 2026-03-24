import { Component, signal } from '@angular/core';
import { LifecycleChild } from "./lifecycle-child/lifecycle-child";

@Component({
  selector: 'app-lifecycle',
  imports: [LifecycleChild],
  template: `
    <h2>Lyfecycle Demo</h2>
    <button (click)="visible.set(!visible())">
      {{ visible() ? 'Destroy child' : 'Recreate child'}}
    </button>

    @if (visible()) {
      <app-lifecycle-child [lifecycleUsername]="username()" />
    }

    <br />
    <input [value]="username()" (input)="username.set($any($event.target).value)" placeholder="Change usernmae"/>
  `,
  styles: ``
})
export class Lifecycle {
  visible = signal(true);
  username = signal('lifecycle-cosmecin');
}
