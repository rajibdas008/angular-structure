import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealRejectComponent } from './deal-reject.component';

describe('RejectPopupComponent', () => {
  let component: DealRejectComponent;
  let fixture: ComponentFixture<DealRejectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealRejectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
