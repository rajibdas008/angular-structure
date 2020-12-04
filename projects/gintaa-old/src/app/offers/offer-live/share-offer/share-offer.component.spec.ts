import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareOfferComponent } from './share-offer.component';

describe('ShareOfferComponent', () => {
  let component: ShareOfferComponent;
  let fixture: ComponentFixture<ShareOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
