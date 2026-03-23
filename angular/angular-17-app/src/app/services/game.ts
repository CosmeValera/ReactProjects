import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GameService {
  games = signal([
    { id: 1, name: 'Uncharted 4' },
    { id: 2, name: 'Horizon 4' },
    { id: 3, name: 'Bloodborne' }
  ])
}
