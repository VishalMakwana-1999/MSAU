import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { OnboardeeService } from '../onboardee.service';
import { of } from 'rxjs'
import { AddOnboardeeComponent } from './add-onboardee.component';

describe('AddOnboardeeComponent', () => {
  let component: AddOnboardeeComponent;
  let fixture: ComponentFixture<AddOnboardeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOnboardeeComponent],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [{
        provide: OnboardeeService, useClass: OnboardeeServiceStub
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOnboardeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class OnboardeeServiceStub {
  fetchOnboardees(): any {
    return of([])
  }

  fetchManagers(): any {
    return of([])
  }
}