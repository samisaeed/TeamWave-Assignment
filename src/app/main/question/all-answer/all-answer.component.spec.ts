import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAnswerComponent } from './all-answer.component';

describe('AllAnswerComponent', () => {
  let component: AllAnswerComponent;
  let fixture: ComponentFixture<AllAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
