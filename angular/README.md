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

> Run `npm install -g @angular/cli` in case you don't have angular. Use `ng version` to check if you do.

## Important files

```py
.
├── src/
│   ├── index.html            # Base HTML: mounts <app-root>
│   ├── main.ts               # Entry point: bootstraps the app
│   │── styles.css            # Global styles
│   └── app/
│       ├── app.ts            # Root component (logic)
│       ├── app.html          # Root component template
│       ├── app.css           # Root component styles
│       ├── app.config.ts     # App-wide providers (router, HTTP client, etc.)
│       └── app.routes.ts     # Route definitions
└── angular.json              # CLI config (build, serve, test options)
```

## How to create components
Command to generate a component with Angular.
```py
ng generate component user
```
```py
# OUTPUT
CREATE src/app/user/user.ts (189 bytes)
CREATE src/app/user/user.html (20 bytes)
CREATE src/app/user/user.css (0 bytes)
CREATE src/app/user/user.spec.ts (540 bytes)
```

To use the component, 1. import it and 2. add it in the HTML part:
```py
import { User } from "./user/user";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, User],
  template: `
    <h1>My app header</h1>
    <app-user/>
  `,
  styles: `h1 {color: green}`
})
export class App { ... }
```

### Other `ng generate` commands:
```bash
# Components
ng generate component user
ng g c user                         # shorthand
ng g c user --inline-template       # no separate .html file
ng g c user --inline-style          # no separate .css file
ng g c user --skip-tests            # no .spec.ts file
ng g c user --dry-run               # preview without creating files
ng g c user --flat                  # no subfolder created
ng g c user --inline-template --inline-style --skip-tests # you can combine flags. Here: inline and no tests

# Other schematics
ng g service user                   # user.service.ts
ng g pipe user                      # user.pipe.ts
ng g directive user                 # user.directive.ts
ng g guard user                     # route guard
ng g interceptor user               # HTTP interceptor

# Docu: https://www.tutorialspoint.com/angular_cli/angular_cli_ng_generate.htm
```

## Component 
The TS, SCSS and HTML can be set in different files or inline:

```ts
// Different files
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App { ... }

// Inline
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<h1>Hola Mundo</h1>`,
  styles: `h1 {color: green}`
})
export class App { ... }
```

In React, Vue, Svelte, etc, it's being lately more favored having everything in the same file, and have a separation of concerns more focused on the different components instead of in different files. However, Angular has always being typically with different files, and it's at each one preference how you want to do it. General rule: for simple components you can do inline, while for bigger components it's usuarlly more recommended to split into different files.

## Properties and Signals
> Signals are now the recommended way to handle state in Angular!

**TL:DR;** Properties are simpler but trigger broader change detection. Signals are more explicit and granular, making them better for performance and the direction Angular is heading.

Properties are plain TypeScript class fields. Angular detects changes through zone.js, which patches async operations and triggers change detection for the whole component tree, simple but less efficient.

Signals (introduced in Angular 16) are reactive primitives. Angular knows exactly which signal changed and updates only the parts of the template that depend on it, no zone.js needed. You call them like a function (`appName()`) to read the value, and use `.set()` / `.update()` to change it:

```ts
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <h1>Hola {{city}}</h1>
    <h2>Esto es {{appName()}}</h2>
  `,
  styles: `h1 {color: green}`
})
export class App {
  city = "Murcia";
  appName = signal('angular-17-app');
  // Both can have protected and readonly. Like this: `protected readonly appName = signal('angular-17-app');`
}
```

**Extra: Difference between Signals and useState() (from React):**

Both hold state and update the UI when changed, but the update model is different:

- `useState` → re-renders the **whole component** top to bottom on every change
- Signals → only the **exact DOM nodes** that read the signal update (subscription-based)
```ts
// React: whole component re-renders on change
const [count, setCount] = useState(0);
setCount(1);

// Angular: only {{count()}} in the template updates
count = signal(0);
count.set(1);
count.update(v => v + 1); // based on previous value
```

This is why signals are generally preferred for performance, no unnecessary re-renders, no need for `useMemo`/`useCallback` workarounds. <i>React is solving this differently via the **React Compiler** (auto-memoization), rather than adopting signals.</i>

## Directives: if/else, for...
.