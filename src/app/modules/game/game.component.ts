import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SpiOffset } from 'src/app/services/player-ship/player-ship.model';
import { SpiGameService } from '../../services/game/game.service';
import { SpiPlayerShipService } from '../../services/player-ship/player-ship.service';

@Component({
  selector: 'spi-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpiGameComponent implements OnInit, OnDestroy {

  playerPosition$: Observable<SpiOffset>;

  constructor(
    private playerShipService: SpiPlayerShipService,
    private gameService: SpiGameService,
  ) { }

  ngOnInit(): void {
    this.gameService.startGame();
    this.playerPosition$ = this.playerShipService.currentPosition$.pipe(
      map(({ top, left }) => ({
        top: `${top}px`,
        left: `${left}px`,
      })),
    );
  }

  ngOnDestroy(): void {
    this.gameService.stopGame();
  }
}
