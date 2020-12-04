import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentOfferComponent } from './sent-offer.component';

describe('SentOfferComponent', () => {
  let component: SentOfferComponent;
  let fixture: ComponentFixture<SentOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
