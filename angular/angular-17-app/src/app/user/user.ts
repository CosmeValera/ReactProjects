import { Component } from '@angular/core';
import { Games } from "../games/games";

@Component({
  selector: 'app-user',
  imports: [Games],
  template: `
    <app-games [username]="username" />
  `,
  styles: ``,
})
export class User {
  username = 'cosmecín'
}
