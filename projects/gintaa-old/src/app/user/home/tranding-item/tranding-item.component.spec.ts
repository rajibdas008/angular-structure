import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrandingItemComponent } from './tranding-item.component';

describe('TrandingItemComponent', () => {
  let component: TrandingItemComponent;
  let fixture: ComponentFixture<TrandingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrandingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrandingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
