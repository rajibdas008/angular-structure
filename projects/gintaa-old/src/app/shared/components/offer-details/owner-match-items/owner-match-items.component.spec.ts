import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerMatchItemsComponent } from './owner-match-items.component';

describe('OwnerMatchItemsComponent', () => {
  let component: OwnerMatchItemsComponent;
  let fixture: ComponentFixture<OwnerMatchItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerMatchItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerMatchItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
