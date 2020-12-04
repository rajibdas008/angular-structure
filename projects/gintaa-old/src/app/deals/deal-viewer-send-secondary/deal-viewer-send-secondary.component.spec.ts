import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealViewerSendSecondaryComponent } from './deal-viewer-send-secondary.component';

describe('DealViewerSendSecondaryComponent', () => {
  let component: DealViewerSendSecondaryComponent;
  let fixture: ComponentFixture<DealViewerSendSecondaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealViewerSendSecondaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealViewerSendSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
