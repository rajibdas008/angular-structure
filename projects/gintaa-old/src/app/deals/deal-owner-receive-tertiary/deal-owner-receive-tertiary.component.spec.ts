import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealOwnerReceiveTertiaryComponent } from './deal-owner-receive-tertiary.component';

describe('DealOwnerReceiveTertiaryComponent', () => {
  let component: DealOwnerReceiveTertiaryComponent;
  let fixture: ComponentFixture<DealOwnerReceiveTertiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealOwnerReceiveTertiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealOwnerReceiveTertiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
