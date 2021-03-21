import { TestBed } from '@angular/core/testing';
import { SpiPlayerShipService } from './player-ship.service';

describe(SpiPlayerShipService.name, () => {
  let service: SpiPlayerShipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpiPlayerShipService);
  });

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
