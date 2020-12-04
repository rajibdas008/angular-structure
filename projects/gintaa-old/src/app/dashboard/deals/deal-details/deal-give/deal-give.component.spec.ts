import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealGiveComponent } from './deal-give.component';

describe('DealGiveComponent', () => {
  let component: DealGiveComponent;
  let fixture: ComponentFixture<DealGiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealGiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealGiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
