import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerMatchItemComponent } from './viewer-match-item.component';

describe('ViewerMatchItemComponent', () => {
  let component: ViewerMatchItemComponent;
  let fixture: ComponentFixture<ViewerMatchItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewerMatchItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerMatchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
