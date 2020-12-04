import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferDetailsSecondaryComponent } from './offer-details-secondary.component';

describe('OfferDetailsSecondaryComponent', () => {
  let component: OfferDetailsSecondaryComponent;
  let fixture: ComponentFixture<OfferDetailsSecondaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferDetailsSecondaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferDetailsSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
