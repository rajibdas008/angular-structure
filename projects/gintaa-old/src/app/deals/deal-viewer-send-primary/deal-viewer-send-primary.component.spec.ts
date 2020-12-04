import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealViewerSendPrimaryComponent } from './deal-viewer-send-primary.component';

describe('DealViewerSendPrimaryComponent', () => {
  let component: DealViewerSendPrimaryComponent;
  let fixture: ComponentFixture<DealViewerSendPrimaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealViewerSendPrimaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealViewerSendPrimaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
