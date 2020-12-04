import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestesMatchComponent } from './suggestes-match.component';

describe('SuggestesMatchComponent', () => {
  let component: SuggestesMatchComponent;
  let fixture: ComponentFixture<SuggestesMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestesMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestesMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
