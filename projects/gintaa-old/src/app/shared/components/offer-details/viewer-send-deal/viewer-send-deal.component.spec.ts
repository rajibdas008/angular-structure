import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerSendDealComponent } from './viewer-send-deal.component';

describe('ViewerSendDealComponent', () => {
  let component: ViewerSendDealComponent;
  let fixture: ComponentFixture<ViewerSendDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewerSendDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerSendDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
