
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { OnboardeeService } from './onboardee.service';

import { OnboardeesComponent } from './onboardees.component';

describe('OnboardeesComponent', () => {
  let component: OnboardeesComponent;
  let fixture: ComponentFixture<OnboardeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnboardeesComponent],
      imports: [ReactiveFormsModule],
      providers: [{
        provide: OnboardeeService, useClass: OnboardeeServiceStub
      }]
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

  it('should contain an h3 tag', () => {
    const h3element = fixture.debugElement.query(By.css('h3'));
    expect(h3element.nativeElement.textContent).toBe("Onboardees")

  })
});

class OnboardeeServiceStub {
  fetchOnboardees(): any {
    return of([])
  }
}