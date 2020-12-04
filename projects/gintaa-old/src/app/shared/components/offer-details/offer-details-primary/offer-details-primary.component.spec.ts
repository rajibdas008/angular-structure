import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferDetailsPrimaryComponent } from './offer-details-primary.component';

describe('OfferDetailsPrimaryComponent', () => {
  let component: OfferDetailsPrimaryComponent;
  let fixture: ComponentFixture<OfferDetailsPrimaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferDetailsPrimaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferDetailsPrimaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
