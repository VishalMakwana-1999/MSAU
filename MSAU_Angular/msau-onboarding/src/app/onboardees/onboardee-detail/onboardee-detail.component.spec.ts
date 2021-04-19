import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardeeDetailComponent } from './onboardee-detail.component';

describe('OnboardeeDetailComponent', () => {
  let component: OnboardeeDetailComponent;
  let fixture: ComponentFixture<OnboardeeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardeeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardeeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
