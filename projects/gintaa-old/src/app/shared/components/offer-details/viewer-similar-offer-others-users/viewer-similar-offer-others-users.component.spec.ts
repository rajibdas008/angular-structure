import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerSimilarOfferOthersUsersComponent } from './viewer-similar-offer-others-users.component';

describe('ViewerSimilarOfferOthersUsersComponent', () => {
  let component: ViewerSimilarOfferOthersUsersComponent;
  let fixture: ComponentFixture<ViewerSimilarOfferOthersUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewerSimilarOfferOthersUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerSimilarOfferOthersUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
