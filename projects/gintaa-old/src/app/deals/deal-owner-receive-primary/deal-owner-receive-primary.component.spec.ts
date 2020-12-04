import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealOwnerReceivePrimaryComponent } from './deal-owner-receive-primary.component';

describe('DealOwnerReceivePrimaryComponent', () => {
  let component: DealOwnerReceivePrimaryComponent;
  let fixture: ComponentFixture<DealOwnerReceivePrimaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealOwnerReceivePrimaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealOwnerReceivePrimaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
