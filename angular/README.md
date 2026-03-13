<!-- Tutorial: https://www.youtube.com/watch?v=f7unUpshmpA -->

# 🅰️ Angular

Angular is a JS framework for building user interfaces. Angular enforces a very structured code organization (e.g., separate files for component logic, template, and styles), which helps keep large projects maintainable. It’s highly opinionated and includes many built-in features (routing, guards, dependency injection, etc.). It's one of the most popular JS frontend frameworks alongside React and Vue.

## 👍 Getting Started
```bash
# Create a new Angular project
ng new angular-17-app

# Run the development server
ng serve
```

> Run `npm install -g @angular/cli` in case you don't have angular. Check with `ng version`.

## Important files

```py
.
├── src/
│   ├── main.ts               # Entry point: bootstraps the app
│   ├── app/
│   │   ├── app.ts            # Root component (logic)
│   │   ├── app.html          # Root component template
│   │   ├── app.css           # Root component styles
│   │   ├── app.config.ts     # App-wide providers (router, HTTP client, etc.)
│   │   └── app.routes.ts     # Route definitions
├── index.html                # Base HTML: mounts <app-root>
├── styles.css                # Global styles
└── angular.json              # CLI config (build, serve, test options)
```

## Component 
The TS, SCSS and HTML can be set inline or in different files (this is the default):

```ts
// Inline
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<h1>Hola Mundo</h1>`,
  styles: `h1 {color: green}`
})
export class App { ... }

// Different files
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App { ... }
```

In React, Vue, Svelte, etc, it's being lately more favored having everything in the same file, and have a separation of concerns more focused on the different components instead of in different files. However, Angular has always being typically with different files, and it's at each one preference how you want to do it. General rule: for simple components you can do inline, while for bigger components it's usuarlly more recommended to split into different files.

## Properties and Signals
.