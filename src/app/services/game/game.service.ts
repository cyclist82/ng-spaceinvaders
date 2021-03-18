import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpiGameService {

  private readonly gameIsOn$ = new Subject<boolean>();

  gameStopped(): Observable<boolean> {
    return this.gameIsOn$.pipe(
      filter(isOn => !isOn),
    );
  }

  gameStarted(): Observable<boolean> {
    return this.gameIsOn$.pipe(
      filter(isOn => isOn),
    );
  }

  startGame(): void {
    this.gameIsOn$.next(true);
  }

  stopGame(): void {
    this.gameIsOn$.next(false);
  }
}
