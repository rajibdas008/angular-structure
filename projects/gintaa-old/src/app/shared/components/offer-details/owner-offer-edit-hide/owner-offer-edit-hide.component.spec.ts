import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerOfferEditHideComponent } from './owner-offer-edit-hide.component';

describe('OwnerOfferEditHideComponent', () => {
  let component: OwnerOfferEditHideComponent;
  let fixture: ComponentFixture<OwnerOfferEditHideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerOfferEditHideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerOfferEditHideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
