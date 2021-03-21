import { Injectable } from '@angular/core';
import { concat, fromEvent, Observable, of, race, timer } from 'rxjs';
import { distinctUntilChanged, filter, first, map, repeat, scan, shareReplay, takeUntil, withLatestFrom } from 'rxjs/operators';
import { ARROW_KEYS, SpiArrowKey } from '../../constants/keycodes';
import { SpiPosition } from '../../shared/interfaces/position.model';
import { SpiDirection } from './player-ship.model';

export const PLAYER_SHIP_SIZE = 50;
const PLAYER_OFFSET_BOTTOM = 150;

@Injectable({
  providedIn: 'root'
})
export class SpiPlayerShipService {

  playerShipPosition(): Observable<SpiPosition> {
    const direction$ = race(
      ARROW_KEYS.map(key => this.arrowPressed(key)),
    ).pipe(
      repeat(),
    );

    const tickingDirection$ = timer(0, 32).pipe(
      withLatestFrom(direction$),
      map(([tick, direction]) => direction),
      filter(direction => !!direction),
    );

    return concat(
      of(null),
      tickingDirection$
    ).pipe(
      scan(this.getNextPosition, this.initialPosition),
      shareReplay(1),
    );
  }

  private getDirection(event: KeyboardEvent): SpiDirection {
    switch (event.key) {
      case 'ArrowLeft': return 'LEFT';
      case 'ArrowRight': return 'RIGHT';
      case 'ArrowUp': return 'UP';
      case 'ArrowDown': return 'DOWN';
      default: return null;
    }
  }

  private arrowPressed(keyToCheck: SpiArrowKey): Observable<SpiDirection> {
    const keyUp$ = fromEvent<KeyboardEvent>(document, 'keyup').pipe(
      first(({ key }) => keyToCheck === key),
    );

    const direction$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
      filter(({ key }) => keyToCheck === key),
      takeUntil(keyUp$),
      map(this.getDirection),
      distinctUntilChanged(),
    );

    return concat(direction$, of(null));
  }

  private getNextPosition({ top, left }: SpiPosition, direction: SpiDirection): SpiPosition {
    if (direction === 'LEFT' || direction === 'RIGHT') {
      return { top, left: direction === 'LEFT' ? left - 10 : left + 10 };
    }
    if (direction === 'UP' || direction === 'DOWN') {
      return { top: direction === 'UP' ? top - 10 : top + 10, left };
    }
    return { top, left };
  }

  private get initialPosition(): SpiPosition {
    const height = document.body.scrollHeight;
    const width = document.body.scrollWidth;
    return { top: height - PLAYER_OFFSET_BOTTOM, left: width / 2 - PLAYER_SHIP_SIZE / 2 };
  }
}
