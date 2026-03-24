import { Component, inject, OnInit, signal } from '@angular/core';
import { Notification as NotificationService } from '../services/notification';
import { Cart } from '../services/cart';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-rxjs-demo',
  imports: [AsyncPipe, JsonPipe],
  template: `
    <h2>RxJS Demo</h2>

    <h3>Approach 1: manual subscribe()</h3>
    <p>Latest (manual): {{ latestManual() }}</p>

    <h3>Approach 2: async pipe (recommended)</h3>
    <p>Latest (async pipe): {{ notifications$ | async }}</p>
    <!-- 👆 async pipe subscribes AND unsubscribes automatically -->

    <h3>Approach 3: BehaviorSubject</h3>
    <p>Cart items: {{ cart$ | async | json }}</p>
    <button (click)="addToCart('Uncharted 4')">Add Uncharted 4</button>
    <button (click)="addToCart('Bloodborne')">Add Bloodborne</button>
    <button (click)="clearCart()">Clear</button>
  `,
  styles: ``,
})
export class RxjsDemo implements OnInit {
  private notificationService = inject(NotificationService)
  private cartService = inject(Cart)

  // Approach 1: manual subscribe
  latestManual = signal('')
  private subscription!: Subscription

  // Approach 2: async pipe-> just assign the observable, no subscribe() needed
  notifications$!: Observable<string>

  // Approach 3: BehaviorSubject
  cart$ = this.cartService.cart

  ngOnInit() {
    // Approach 1: you must unsubscribe manually in ngOnDestroy
    this.subscription = this.notificationService.getNotifications()
      .subscribe(notification => {
        this.latestManual.set(notification)
      })

    // Approach 2: just store the observable, the async pipe handles the rest
    this.notifications$ = this.notificationService.getNotifications()
  }

  ngOnDestroy() {
    // ⚠️ forgetting this causes a memory leak
    this.subscription.unsubscribe()
  }


  // APPROACH 3: BehaviorSubject
  addToCart(item: string) {
    this.cartService.addItem(item)
  }
  clearCart() {
    this.cartService.clear()
  }
}
