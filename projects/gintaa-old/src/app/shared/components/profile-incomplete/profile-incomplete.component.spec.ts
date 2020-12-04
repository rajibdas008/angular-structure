import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileIncompleteComponent } from './profile-incomplete.component';

describe('ProfileIncompleteComponent', () => {
  let component: ProfileIncompleteComponent;
  let fixture: ComponentFixture<ProfileIncompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileIncompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileIncompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
