import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerSendDealComponent } from './owner-send-deal.component';

describe('OwnerSendDealComponent', () => {
  let component: OwnerSendDealComponent;
  let fixture: ComponentFixture<OwnerSendDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerSendDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerSendDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
