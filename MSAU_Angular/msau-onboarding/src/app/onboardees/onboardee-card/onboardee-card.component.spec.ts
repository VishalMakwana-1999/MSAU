import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardeeCardComponent } from './onboardee-card.component';

describe('OnboardeeCardComponent', () => {
  let component: OnboardeeCardComponent;
  let fixture: ComponentFixture<OnboardeeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardeeCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardeeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
