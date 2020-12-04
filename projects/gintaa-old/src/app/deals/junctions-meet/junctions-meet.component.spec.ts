import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JunctionsMeetComponent } from './junctions-meet.component';

describe('JunctionsMeetComponent', () => {
  let component: JunctionsMeetComponent;
  let fixture: ComponentFixture<JunctionsMeetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JunctionsMeetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JunctionsMeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
