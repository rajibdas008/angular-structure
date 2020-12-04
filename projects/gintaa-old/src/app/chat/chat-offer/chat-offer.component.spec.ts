import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatOfferComponent } from './chat-offer.component';

describe('ChatOfferComponent', () => {
  let component: ChatOfferComponent;
  let fixture: ComponentFixture<ChatOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
