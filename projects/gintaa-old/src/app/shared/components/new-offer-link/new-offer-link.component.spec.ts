import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOfferLinkComponent } from './new-offer-link.component';

describe('NewOfferLinkComponent', () => {
  let component: NewOfferLinkComponent;
  let fixture: ComponentFixture<NewOfferLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOfferLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOfferLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
