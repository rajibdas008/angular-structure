import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealOwnerReceiveSecondaryComponent } from './deal-owner-receive-secondary.component';

describe('DealOwnerReceiveSecondaryComponent', () => {
  let component: DealOwnerReceiveSecondaryComponent;
  let fixture: ComponentFixture<DealOwnerReceiveSecondaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealOwnerReceiveSecondaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealOwnerReceiveSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
