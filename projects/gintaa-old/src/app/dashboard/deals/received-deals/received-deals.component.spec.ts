import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedDealsComponent } from './received-deals.component';

describe('ReceivedDealsComponent', () => {
  let component: ReceivedDealsComponent;
  let fixture: ComponentFixture<ReceivedDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivedDealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
