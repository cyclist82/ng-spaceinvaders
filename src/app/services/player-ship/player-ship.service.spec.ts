import { TestBed } from '@angular/core/testing';
import { SpiPlayerShipService } from './player-ship.service';

describe('PlayerShipService', () => {
  let service: SpiPlayerShipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpiPlayerShipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
