import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentLocationsComponent } from './current-locations.component';

describe('CurrentLocationsComponent', () => {
  let component: CurrentLocationsComponent;
  let fixture: ComponentFixture<CurrentLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
