import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNameVerifyComponent } from './profile-name-verify.component';

describe('ProfileNameVerifyComponent', () => {
  let component: ProfileNameVerifyComponent;
  let fixture: ComponentFixture<ProfileNameVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileNameVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileNameVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
