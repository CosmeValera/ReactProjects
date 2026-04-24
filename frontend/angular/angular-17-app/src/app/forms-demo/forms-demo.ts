import { Component, Directive, ElementRef, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-forms-demo',
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgStyle],
  template: `
    <h2>Forms Demo</h2>

    <!-- ========== TEMPLATE-DRIVEN FORM (ngModel) ========== -->
    <h3>Template-driven form</h3>
    <input
      [(ngModel)]="username"
      placeholder="Enter username"
    />
    <p>Hello, {{ username }}</p>

    <!-- ========== REACTIVE FORM ========== -->
    <h3>Reactive form</h3>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="email" placeholder="Email" />

      @if (form.get('email')?.invalid && form.get('email')?.touched) {
        <p class="error">Valid email is required</p>
      }

      <input formControlName="password" type="password" placeholder="Password" />

      @if (form.get('password')?.invalid && form.get('password')?.touched) {
        <p class="error">Min 6 characters</p>
      }

      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>

    @if (submitted()) {
      <p>Submitted! Email: {{ form.value.email }}</p>
    }

    <!-- ========== ngClass ========== -->
    <h3>ngClass</h3>
    <button (click)="toggleActive()">Toggle active</button>
    <p [ngClass]="{ active: isActive(), highlight: isActive() }">
      I change classes dynamically
    </p>

    <!-- ========== ngStyle ========== -->
    <h3>ngStyle</h3>
    <button (click)="toggleColor()">Toggle color</button>
    <p [ngStyle]="{ color: isRed() ? 'red' : 'blue', fontSize: '1.2rem' }">
      I change styles dynamically
    </p>
  `,
  styles: `
    .active { font-weight: bold; }
    .highlight { background: yellow; }
    .error { color: red; font-size: 0.85rem; }
    input { display: block; margin-bottom: 8px; }
  `
})
export class FormsDemo {
  // Template-driven
  username = ''

  // Reactive
  private fb = new FormBuilder()
  submitted = signal(false)

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  onSubmit() {
    if (this.form.valid) {
      this.submitted.set(true)
    }
  }

  // ngClass
  isActive = signal(false)
  toggleActive() { this.isActive.update(v => !v) }

  // ngStyle
  isRed = signal(true)
  toggleColor() { this.isRed.update(v => !v) }
}