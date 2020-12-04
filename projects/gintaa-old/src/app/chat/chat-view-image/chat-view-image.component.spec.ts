import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatViewImageComponent } from './chat-view-image.component';

describe('ChatViewImageComponent', () => {
  let component: ChatViewImageComponent;
  let fixture: ComponentFixture<ChatViewImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatViewImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatViewImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
