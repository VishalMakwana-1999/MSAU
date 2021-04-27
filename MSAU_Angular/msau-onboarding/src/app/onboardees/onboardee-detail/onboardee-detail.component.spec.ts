import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SidebarComponent } from 'src/app/shared/sidebar/sidebar.component';
import { OnboardeeService } from '../onboardee.service';

import { OnboardeeDetailComponent } from './onboardee-detail.component';

describe('OnboardeeDetailComponent', () => {
  let component: OnboardeeDetailComponent;
  let fixture: ComponentFixture<OnboardeeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnboardeeDetailComponent, SidebarComponent],
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
  it('should toggle edit on click', () => {
    const edit = component.edit;
    component.toggleEdit();
    const newEdit = component.edit;
    expect(newEdit).toBe(!edit)
  })
});
class OnboardeeServiceStub {
  fetchOnboardees_byId(): any {
    return of()
  }

  fetchManagers(): any {
    return of([])
  }
}