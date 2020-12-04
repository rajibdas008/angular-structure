import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedDealComponent } from './closed-deals.component';

describe('ClosedDealComponent', () => {
  let component: ClosedDealComponent;
  let fixture: ComponentFixture<ClosedDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
