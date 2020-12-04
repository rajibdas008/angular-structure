import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealViewerAttachOffersComponent } from './deal-viewer-attach-offers.component';

describe('DealViewerAttachOffersComponent', () => {
  let component: DealViewerAttachOffersComponent;
  let fixture: ComponentFixture<DealViewerAttachOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealViewerAttachOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealViewerAttachOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
