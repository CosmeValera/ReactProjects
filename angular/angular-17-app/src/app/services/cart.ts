import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Cart {
  private cart$ = new BehaviorSubject<string[]>([])

  cart = this.cart$.asObservable()

  addItem(item: string) {
    const current = this.cart$.getValue()
    this.cart$.next([...current, item])
  }

  clear() {
    this.cart$.next([])
  }
}