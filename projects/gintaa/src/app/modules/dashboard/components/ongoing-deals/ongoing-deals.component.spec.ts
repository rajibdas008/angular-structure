import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingDealsComponent } from './ongoing-deals.component';

describe('OngoingDealsComponent', () => {
  let component: OngoingDealsComponent;
  let fixture: ComponentFixture<OngoingDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OngoingDealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
