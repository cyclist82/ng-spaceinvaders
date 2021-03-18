import { TestBed } from '@angular/core/testing';
import { SpiGameService } from './game.service';


describe(SpiGameService.name, () => {
  let service: SpiGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpiGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
