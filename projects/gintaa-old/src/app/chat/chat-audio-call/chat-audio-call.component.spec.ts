import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAudioCallComponent } from './chat-audio-call.component';

describe('ChatAudioCallComponent', () => {
  let component: ChatAudioCallComponent;
  let fixture: ComponentFixture<ChatAudioCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatAudioCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatAudioCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
