import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SpiLasersService } from '../../services/lasers/lasers.service';
import { SpiOffset } from '../../services/player-ship/player-ship.model';
import { SpiPlayerShipService } from '../../services/player-ship/player-ship.service';
import { SpiPosition } from '../../shared/interfaces/position.model';

@Component({
  selector: 'spi-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpiGameComponent implements OnInit {

  playerPosition$: Observable<SpiOffset>;
  playerLasers$: Observable<SpiOffset[]>;

  constructor(
    private lasersService: SpiLasersService,
    private playerShipService: SpiPlayerShipService,
  ) { }

  ngOnInit(): void {
    this.playerPosition$ = this.playerShipService.playerShipPosition().pipe(
      map(this.mapCoordinates),
    );

    this.playerLasers$ = this.lasersService.playerLasers().pipe(
      map(lasers => lasers.map(this.mapCoordinates)),
    );
  }

  private mapCoordinates({ top, left }: SpiPosition): SpiOffset {
    return {
      top: `${top}px`,
      left: `${left}px`,
    };
  }
}
