import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <div>Name: angular-remote</div>
      <div>Framework: Angular</div>
      <div>Language: TypeScript</div>
      <div>not working sadly when exported to the react host</div>
    </div>
  `,
})
export class App {}
