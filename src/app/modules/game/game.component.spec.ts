import { ChangeDetectionStrategy, DebugElement } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { SpiLasersService } from '../../services/lasers/lasers.service';
import { SpiPlayerShipService } from '../../services/player-ship/player-ship.service';
import { SpiPosition } from '../../shared/interfaces/position.model';
import { SpiGameComponent } from './game.component';
import { SpiGameModule } from './game.module';

describe(SpiGameComponent.name, () => {
  let fixture: MockedComponentFixture<SpiGameComponent>;
  let component: SpiGameComponent;

  beforeEach(() =>
    MockBuilder(SpiGameComponent, SpiGameModule)
      .mock(SpiLasersService, {
        playerLasers: () => EMPTY,
      })
      .mock(SpiPlayerShipService, {
        playerShipPosition: () => EMPTY,
      }),
  );

  beforeEach(() => {
    // we need to override the components change detection strategy
    // see this angular issue for more information
    // https://github.com/angular/angular/issues/12313
    TestBed.overrideComponent(SpiGameComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    });
    fixture = MockRender(SpiGameComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('player ship', () => {
    const position$ = new BehaviorSubject<SpiPosition>({ top: 123, left: 321 });
    let playerShipElement: DebugElement;

    beforeEach(() => {
      const playerShipService = TestBed.inject(SpiPlayerShipService);
      jest.spyOn(playerShipService, 'playerShipPosition').mockReturnValueOnce(position$);
      component.ngOnInit();
      fixture.detectChanges();
      playerShipElement = fixture.debugElement.query(By.css('.player-ship'));
    });

    it('should be present', () => {
      expect(playerShipElement).toBeTruthy();
    });

    it('should know it\'s position', () => {
      let top = playerShipElement.nativeElement.style.top;
      let left = playerShipElement.nativeElement.style.left;

      expect(top).toEqual('123px');
      expect(left).toEqual('321px');

      position$.next({ top: 456, left: 654 });
      fixture.detectChanges();
      top = playerShipElement.nativeElement.style.top;
      left = playerShipElement.nativeElement.style.left;

      expect(top).toEqual('456px');
      expect(left).toEqual('654px');
    });
  });

  describe('player lasers', () => {
    const lasers$ = new BehaviorSubject<SpiPosition[]>([{ top: 123, left: 321 }, { top: 456, left: 654 }]);
    let laserElements: DebugElement[];

    beforeEach(() => {
      const playerShipService = TestBed.inject(SpiLasersService);
      jest.spyOn(playerShipService, 'playerLasers').mockReturnValueOnce(lasers$);
      component.ngOnInit();
      fixture.detectChanges();
      laserElements = fixture.debugElement.queryAll(By.css('.laser'));
    });

    it('should should be present', () => {
      expect(laserElements.length).toBe(2);
    });

    it('should know their position', () => {
      let firstTop = laserElements[0].nativeElement.style.top;
      let firstLeft = laserElements[0].nativeElement.style.left;
      let secondTop = laserElements[1].nativeElement.style.top;
      let secondLeft = laserElements[1].nativeElement.style.left;

      expect(firstTop).toEqual('123px');
      expect(firstLeft).toEqual('321px');
      expect(secondTop).toEqual('456px');
      expect(secondLeft).toEqual('654px');

      lasers$.next([{ top: 789, left: 987 }, { top: 543, left: 345 }]);
      fixture.detectChanges();
      laserElements = fixture.debugElement.queryAll(By.css('.laser'));
      firstTop = laserElements[0].nativeElement.style.top;
      firstLeft = laserElements[0].nativeElement.style.left;
      secondTop = laserElements[1].nativeElement.style.top;
      secondLeft = laserElements[1].nativeElement.style.left;

      expect(firstTop).toEqual('789px');
      expect(firstLeft).toEqual('987px');
      expect(secondTop).toEqual('543px');
      expect(secondLeft).toEqual('345px');
    });
  });
});
