import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('should render the todo heading', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('Todo app');
  });

  it('should add a trimmed todo item', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.draft.set('  Ship Angular todo app  ');
    app.addTodo();

    expect(app.todos().length).toBe(1);
    expect(app.todos()[0].text).toBe('Ship Angular todo app');
    expect(app.remainingCount()).toBe(1);
  });

  it('should filter completed tasks', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.draft.set('Write tests');
    app.addTodo();
    app.draft.set('Review UI');
    app.addTodo();

    const newestTodoId = app.todos()[0].id;
    app.toggleTodo(newestTodoId);
    app.setFilter('completed');

    expect(app.visibleTodos().length).toBe(1);
    expect(app.visibleTodos()[0].completed).toBeTrue();
  });
}
