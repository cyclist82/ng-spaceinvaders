import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';
import { SpiPlayerShipService } from '../player-ship/player-ship.service';
import { SpiLasersService } from './lasers.service';

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

describe(SpiLasersService.name, () => {
  let service: SpiLasersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(SpiPlayerShipService, {
          playerShipPosition: () => of({ top: 123, left: 321 }),
        }),
      ]
    });
    service = TestBed.inject(SpiLasersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add, move and remove player lasers', () => {
    const spaceKeyDown = () => {
      const event = new KeyboardEvent('keydown', { code: 'Space' });
      document.dispatchEvent(event);
    };

    const source$ = service.playerLasers();
    testScheduler.run(helpers => {
      const { hot, expectObservable } = helpers;
      hot('---a 100ms b 200ms c').pipe(
        tap(() => spaceKeyDown()),
      ).subscribe();
      const expected = '--- a 28ms b 31ms c 31ms d 31ms e 31ms f 31ms g 31ms h 31ms i 31ms j 16ms k 14ms l 31ms m 31ms n 31ms o 31ms p 31ms q';
      const values = {
        a: [{ top: 123, left: 344.5 }],
        b: [{ top: 113, left: 344.5 }],
        c: [{ top: 103, left: 344.5 }],
        d: [{ top: 93, left: 344.5 }],
        e: [{ top: 83, left: 344.5 }],
        f: [{ top: 73, left: 344.5 }],
        g: [{ top: 63, left: 344.5 }],
        h: [{ top: 53, left: 344.5 }],
        i: [{ top: 43, left: 344.5 }],
        j: [{ top: 33, left: 344.5 }],
        k: [{ top: 33, left: 344.5 }, { top: 123, left: 344.5 }],
        l: [{ top: 23, left: 344.5 }, { top: 113, left: 344.5 }],
        m: [{ top: 13, left: 344.5 }, { top: 103, left: 344.5 }],
        n: [{ top: 3, left: 344.5 }, { top: 93, left: 344.5 }],
        o: [{ top: -7, left: 344.5 }, { top: 83, left: 344.5 }],
        p: [{ top: -17, left: 344.5 }, { top: 73, left: 344.5 }],
        q: [{ top: 63, left: 344.5 }],
      };
      const unsubscribe = '500ms !';

      expectObservable(source$, unsubscribe).toBe(expected, values);
    });
  });
});
