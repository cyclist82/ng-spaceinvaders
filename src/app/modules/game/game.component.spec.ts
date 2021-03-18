import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiGameComponent } from './game.component';

describe('GameComponent', () => {
  let component: SpiGameComponent;
  let fixture: ComponentFixture<SpiGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpiGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpiGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
