import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourMatchComponent } from './your-match.component';

describe('YourMatchComponent', () => {
  let component: YourMatchComponent;
  let fixture: ComponentFixture<YourMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
