import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferLiveComponent } from './offer-live.component';

describe('OfferLiveComponent', () => {
  let component: OfferLiveComponent;
  let fixture: ComponentFixture<OfferLiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferLiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
