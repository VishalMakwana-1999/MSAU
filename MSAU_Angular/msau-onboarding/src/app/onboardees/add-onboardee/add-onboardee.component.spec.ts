import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { OnboardeeService } from '../onboardee.service';
import { of } from 'rxjs'
import { AddOnboardeeComponent } from './add-onboardee.component';
import { By } from '@angular/platform-browser';
import { Location } from "@angular/common"
import { Component } from '@angular/core';
import { SidebarComponent } from 'src/app/shared/sidebar/sidebar.component';
describe('AddOnboardeeComponent', () => {
  let component: AddOnboardeeComponent;
  let fixture: ComponentFixture<AddOnboardeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOnboardeeComponent, SidebarComponent],
      imports: [RouterTestingModule.withRoutes([
        { path: 'onboardees', component: DummyComponent }
      ]), ReactiveFormsModule],
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

  it('should go to Dashboard on successfully adding', () => {
    component.response = {
      'Status': 200
    }
    component.goToDashboard();
    fixture.detectChanges()
    const location = TestBed.inject(Location)
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/onboardees')
    })
  })
});
@Component({ template: '' })
class DummyComponent { }
class OnboardeeServiceStub {
  fetchOnboardees(): any {
    return of([])
  }

  fetchManagers(): any {
    return of([])
  }
}