import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signals-demo',
  imports: [FormsModule],
  template: `
    <h2>Signals Demo</h2>

    <!-- ===== computed() ===== -->
     <h3>computed()</h3>
     <p>Price: <input type="number" [(ngModel)]="price" /></p>
     <p>Tax (21%) <input type="number" [(ngModel)]="tax" /></p>
     <p>Total (computed): <strong>{{ total() }}</strong></p>
    <!-- 👆 recalculates automatically when price or tax change -->
     
    <!-- ===== computed() ===== -->
     <h3>effect()</h3>
     <p>Status: <strong> {{ status() }}</strong></p>
     <button (click)="status.set('loading')">Set loading</button>
     <button (click)="status.set('success')">Set success</button>
     <button (click)="status.set('error')">Set error</button>
     <p>LocalStorage value: {{ statusLocalStorage() }}</p>
     <p><small>Open the console to see effect() firing on every change</small></p>
  `,
  styles: ``,
})
export class SignalsDemo {
  ////////////////////////////////////
  //// computed(): derived state /////
  price = signal(100)
  tax = signal(0.21)
  total = computed(() => {
    const result = this.price() * (1 + this.tax())
    return result.toFixed(2)
  })
  ////      END: computed()      /////
  ////////////////////////////////////


  ////////////////////////////////
  //// effect(): side effect /////
  status = signal('idle')
  statusLocalStorage = signal(localStorage.getItem('status') ?? 'none')
  
  constructor() {
    effect(() => {
      // Runs every time status changes, no dependency array needed
      console.log('Status changed:', this.status())
      
      // Common use cases: logging, syncing to localStorage, analytics, etc
      localStorage.setItem('status', this.status())

      // Show in the UI the localStorage value
      this.statusLocalStorage.set(localStorage.getItem('status') || '')
    })
  }
  ////     END: effect()     /////
  ////////////////////////////////
}
