import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMaylikeComponent } from './home-maylike.component';

describe('HomeMaylikeComponent', () => {
  let component: HomeMaylikeComponent;
  let fixture: ComponentFixture<HomeMaylikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeMaylikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMaylikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
