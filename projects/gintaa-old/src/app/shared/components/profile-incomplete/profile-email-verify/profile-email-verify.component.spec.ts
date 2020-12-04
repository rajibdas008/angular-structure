import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEmailVerifyComponent } from './profile-email-verify.component';

describe('ProfileEmailVerifyComponent', () => {
  let component: ProfileEmailVerifyComponent;
  let fixture: ComponentFixture<ProfileEmailVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileEmailVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEmailVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
