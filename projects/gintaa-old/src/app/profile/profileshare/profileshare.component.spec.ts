import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileshareComponent } from './profileshare.component';

describe('ProfileshareComponent', () => {
  let component: ProfileshareComponent;
  let fixture: ComponentFixture<ProfileshareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileshareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileshareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
