import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishTextCardComponent } from './english-text-card.component';

describe('EnglishTextCardComponent', () => {
  let component: EnglishTextCardComponent;
  let fixture: ComponentFixture<EnglishTextCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnglishTextCardComponent]
    });
    fixture = TestBed.createComponent(EnglishTextCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
