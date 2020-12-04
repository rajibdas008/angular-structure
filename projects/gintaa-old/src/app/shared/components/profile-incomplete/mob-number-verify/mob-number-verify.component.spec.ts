import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobNumberVerifyComponent } from './mob-number-verify.component';

describe('MobNumberVerifyComponent', () => {
  let component: MobNumberVerifyComponent;
  let fixture: ComponentFixture<MobNumberVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobNumberVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobNumberVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
