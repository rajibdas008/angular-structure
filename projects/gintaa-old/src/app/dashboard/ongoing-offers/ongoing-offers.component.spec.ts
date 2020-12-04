import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingOffersComponent } from './ongoing-offers.component';

describe('OngoingOffersComponent', () => {
  let component: OngoingOffersComponent;
  let fixture: ComponentFixture<OngoingOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OngoingOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
