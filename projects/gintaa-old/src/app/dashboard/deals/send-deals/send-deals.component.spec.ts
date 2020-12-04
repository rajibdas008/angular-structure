import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendDealsComponent } from './send-deals.component';

describe('SendDealsComponent', () => {
  let component: SendDealsComponent;
  let fixture: ComponentFixture<SendDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendDealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
