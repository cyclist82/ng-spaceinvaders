import { Injectable } from '@angular/core';
import { concat, fromEvent, merge, Observable, of, timer } from 'rxjs';
import { delay, filter, first, map, repeat, scan, withLatestFrom } from 'rxjs/operators';
import { SpiPosition } from '../../shared/interfaces/position.model';
import { PLAYER_SHIP_SIZE, SpiPlayerShipService } from '../player-ship/player-ship.service';

const LASER_WIDTH = 3;
const LASER_RELOAD_TIME = 300;

@Injectable({
  providedIn: 'root'
})
export class SpiLasersService {

  constructor(private playerShipService: SpiPlayerShipService) { }

  playerLasers(): Observable<SpiPosition[]> {
    return merge(
      this.playerLaserShot(),
      timer(0, 32)
    ).pipe(
      filter(value => !!value),
      map(shotOrTick => typeof shotOrTick === 'number' ? null : shotOrTick),
      scan(this.moveAddAndRemoveLasers, []),
      filter(lasers => !!lasers.length),
    );
  }

  private playerLaserShot(): Observable<SpiPosition> {
    const shot$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
      filter(({ code }) => code === 'Space'),
      withLatestFrom(this.playerShipService.playerShipPosition()),
      map(([event, position]) => ({
        ...position,
        left: position.left + PLAYER_SHIP_SIZE / 2 - LASER_WIDTH / 2
      })),
      first(),
    );

    const laserReload$ = of(null).pipe(
      delay(LASER_RELOAD_TIME),
    );

    return concat(of(null), shot$, of(null), laserReload$).pipe(
      repeat(),
    );
  }

  private moveAddAndRemoveLasers(lasers: SpiPosition[], newLaser: SpiPosition): SpiPosition[] {
    if (newLaser) {
      return [...lasers, newLaser];
    }
    return lasers
      .filter(laser => laser.top > -10)
      .map(laser => ({
        ...laser,
        top: laser.top - 10,
      }));
  }
}
