import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOfferImagesComponent } from './add-offer-images.component';

describe('AddOfferImagesComponent', () => {
  let component: AddOfferImagesComponent;
  let fixture: ComponentFixture<AddOfferImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOfferImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOfferImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
