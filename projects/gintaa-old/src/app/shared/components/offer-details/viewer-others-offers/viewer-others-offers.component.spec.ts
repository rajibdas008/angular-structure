import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerOthersOffersComponent } from './viewer-others-offers.component';

describe('ViewerOthersOffersComponent', () => {
  let component: ViewerOthersOffersComponent;
  let fixture: ComponentFixture<ViewerOthersOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewerOthersOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerOthersOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
