import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaatCallSmallViewComponent } from './chaat-call-small-view.component';

describe('ChaatCallSmallViewComponent', () => {
  let component: ChaatCallSmallViewComponent;
  let fixture: ComponentFixture<ChaatCallSmallViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChaatCallSmallViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaatCallSmallViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
