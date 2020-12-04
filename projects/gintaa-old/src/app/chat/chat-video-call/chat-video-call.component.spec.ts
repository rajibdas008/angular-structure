import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatVideoCallComponent } from './chat-video-call.component';

describe('ChatVideoCallComponent', () => {
  let component: ChatVideoCallComponent;
  let fixture: ComponentFixture<ChatVideoCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatVideoCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatVideoCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
