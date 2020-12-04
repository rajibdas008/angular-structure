import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingProductsComponent } from './trading-products.component';

describe('TradingProductsComponent', () => {
  let component: TradingProductsComponent;
  let fixture: ComponentFixture<TradingProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradingProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
