import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerOthersOffersComponent } from './owner-others-offers.component';

describe('OwnerOthersOffersComponent', () => {
  let component: OwnerOthersOffersComponent;
  let fixture: ComponentFixture<OwnerOthersOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerOthersOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerOthersOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
