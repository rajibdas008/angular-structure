import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishingOfferComponent } from './publishing-offer.component';

describe('PublishingOfferComponent', () => {
  let component: PublishingOfferComponent;
  let fixture: ComponentFixture<PublishingOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishingOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishingOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
