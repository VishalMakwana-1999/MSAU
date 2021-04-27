import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { OnboardeeService } from '../onboardee.service';

import { OnboardeeDetailComponent } from './onboardee-detail.component';

describe('OnboardeeDetailComponent', () => {
  let component: OnboardeeDetailComponent;
  let fixture: ComponentFixture<OnboardeeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnboardeeDetailComponent],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [
        { provide: OnboardeeService, useClass: OnboardeeServiceStub }
      ]
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
class OnboardeeServiceStub {
  fetchOnboardees_byId(): any {
    return of({
      "demandId": 1,
      "fname": "VishalEdited",
      "lname": "Makwana",
      "startDate": "01-06-2021",
      "bgcStatus": "Idle",
      "managerId": 12,
      "location": "Mumbai",
      "etaCompletion": "10",
      "email": "vishal.makwana@accolitedigital.com",
      "dob": "01-10-1999",
      "onboardStatus": "0",
      "manager": {
        "managerId": 12,
        "managerFName": "Test",
        "managerLName": "Manager"
      },
      "skills": {
        "skillList": [
          {
            "id": 25,
            "demandId": 1,
            "skillName": "Java",
            "level": "Novice"
          }
        ]
      },
      "phone": "9653484023"
    })
  }

  fetchManagers(): any {
    return of([])
  }
}