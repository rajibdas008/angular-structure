import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBottomComponent } from './chat-bottom.component';

describe('ChatBottomComponent', () => {
  let component: ChatBottomComponent;
  let fixture: ComponentFixture<ChatBottomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatBottomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
