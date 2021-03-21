import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { SpiGameService } from '../game/game.service';
import { SpiPlayerShipService } from './player-ship.service';

describe(SpiPlayerShipService.name, () => {
  let service: SpiPlayerShipService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(SpiGameService, {
          gameStarted: jest.fn(() => of(true)),
        }),
      ]
    });
    service = TestBed.inject(SpiPlayerShipService);
  });

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
