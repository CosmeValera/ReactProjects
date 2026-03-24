import { Injectable } from '@angular/core';
import { interval, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Notification {
  
  // Emits a new notification every 2 seconds
  getNotifications(): Observable<string> {
    return interval(2000).pipe(
      map(n => `Notification #${n + 1}`)
    )
  }
}
