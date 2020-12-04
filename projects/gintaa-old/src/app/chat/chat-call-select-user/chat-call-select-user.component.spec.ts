import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCallSelectUserComponent } from './chat-call-select-user.component';

describe('ChatCallSelectUserComponent', () => {
  let component: ChatCallSelectUserComponent;
  let fixture: ComponentFixture<ChatCallSelectUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatCallSelectUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatCallSelectUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
