import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardeesComponent } from './onboardees.component';

describe('OnboardeesComponent', () => {
  let component: OnboardeesComponent;
  let fixture: ComponentFixture<OnboardeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
