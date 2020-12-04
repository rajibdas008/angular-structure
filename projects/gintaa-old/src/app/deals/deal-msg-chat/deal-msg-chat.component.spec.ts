import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealMsgChatComponent } from './deal-msg-chat.component';

describe('DealMsgChatComponent', () => {
  let component: DealMsgChatComponent;
  let fixture: ComponentFixture<DealMsgChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealMsgChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealMsgChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
