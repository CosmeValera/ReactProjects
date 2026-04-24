import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

type TodoFilter = 'all' | 'active' | 'completed';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly storageKey = 'todo-app.todos';
  private readonly platformId = inject(PLATFORM_ID);
  private readonly dateFormatter = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
  });

  readonly filters: readonly TodoFilter[] = ['all', 'active', 'completed'];
  readonly filterLabels: Record<TodoFilter, string> = {
    all: 'Everything',
    active: 'In motion',
    completed: 'Wrapped',
  };

  readonly draft = signal('');
  readonly filter = signal<TodoFilter>('all');
  readonly todos = signal<TodoItem[]>(this.loadTodos());

  readonly visibleTodos = computed(() => {
    switch (this.filter()) {
      case 'active':
        return this.todos().filter((todo) => !todo.completed);
      case 'completed':
        return this.todos().filter((todo) => todo.completed);
      default:
        return this.todos();
    }
  });

  readonly totalCount = computed(() => this.todos().length);
  readonly completedCount = computed(
    () => this.todos().filter((todo) => todo.completed).length,
  );
  readonly remainingCount = computed(
    () => this.totalCount() - this.completedCount(),
  );
  readonly completionPercent = computed(() => {
    const total = this.totalCount();

    if (!total) {
      return 0;
    }

    return Math.round((this.completedCount() / total) * 100);
  });
  readonly hasTodos = computed(() => this.totalCount() > 0);
  readonly hasCompletedTodos = computed(() => this.completedCount() > 0);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        try {
          localStorage.setItem(this.storageKey, JSON.stringify(this.todos()));
        } catch {
          // Ignore storage write failures and keep the UI responsive.
        }
      });
    }
  }

  addTodo(): void {
    const text = this.draft().trim();

    if (!text) {
      return;
    }

    this.todos.update((todos) => [
      {
        id: this.nextId(todos),
        text,
        completed: false,
        createdAt: new Date().toISOString(),
      },
      ...todos,
    ]);
    this.draft.set('');
  }

  toggleTodo(id: number): void {
    this.todos.update((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  removeTodo(id: number): void {
    this.todos.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  clearCompleted(): void {
    this.todos.update((todos) => todos.filter((todo) => !todo.completed));
  }

  markAllDone(): void {
    this.todos.update((todos) =>
      todos.map((todo) =>
        todo.completed ? todo : { ...todo, completed: true },
      ),
    );
  }

  setFilter(filter: TodoFilter): void {
    this.filter.set(filter);
  }

  filterCount(filter: TodoFilter): number {
    switch (filter) {
      case 'active':
        return this.remainingCount();
      case 'completed':
        return this.completedCount();
      default:
        return this.totalCount();
    }
  }

  formatCreatedAt(value: string): string {
    return this.dateFormatter.format(new Date(value));
  }

  private loadTodos(): TodoItem[] {
    if (!isPlatformBrowser(this.platformId)) {
      return [];
    }

    try {
      const storedTodos = localStorage.getItem(this.storageKey);

      if (!storedTodos) {
        return [];
      }

      return this.normalizeTodos(JSON.parse(storedTodos));
    } catch {
      return [];
    }
  }

  private normalizeTodos(value: unknown): TodoItem[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value.flatMap((item, index) => {
      if (!item || typeof item !== 'object') {
        return [];
      }

      const todo = item as Partial<TodoItem>;
      const text = typeof todo.text === 'string' ? todo.text.trim() : '';

      if (!text) {
        return [];
      }

      return [
        {
          id: typeof todo.id === 'number' ? todo.id : index + 1,
          text,
          completed: Boolean(todo.completed),
          createdAt:
            typeof todo.createdAt === 'string'
              ? todo.createdAt
              : new Date().toISOString(),
        },
      ];
    });
  }

  private nextId(todos: TodoItem[]): number {
    return todos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1;
  }
}
