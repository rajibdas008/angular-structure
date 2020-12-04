import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealTakeComponent } from './deal-take.component';

describe('DealTakeComponent', () => {
  let component: DealTakeComponent;
  let fixture: ComponentFixture<DealTakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealTakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealTakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
