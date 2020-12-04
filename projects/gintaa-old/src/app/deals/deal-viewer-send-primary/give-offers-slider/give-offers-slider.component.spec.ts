import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveOffersSliderComponent } from './give-offers-slider.component';

describe('GiveOffersSliderComponent', () => {
  let component: GiveOffersSliderComponent;
  let fixture: ComponentFixture<GiveOffersSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiveOffersSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiveOffersSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
