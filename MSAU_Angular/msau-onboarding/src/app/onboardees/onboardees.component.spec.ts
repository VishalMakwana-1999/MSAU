
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { OnboardeeService } from './onboardee.service';

import { OnboardeesComponent } from './onboardees.component';

describe('OnboardeesComponent', () => {
  let component: OnboardeesComponent;
  let fixture: ComponentFixture<OnboardeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnboardeesComponent, SidebarComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
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

  it('should not show table items if no onboardee present', () => {
    const tableitems = fixture.debugElement.queryAll(By.css(".table-items-list"))
    expect(tableitems.length).toBe(0)
  })

  it('should show table items when onboardeee is present', () => {
    component.onboardee_list = [{ id: 1, fname: "Vishal", lname: "Makwana" }]
    fixture.detectChanges()
    const tableitems = fixture.debugElement.queryAll(By.css(".table-items-list"))
    expect(tableitems.length).toBe(1)
  })
});

class OnboardeeServiceStub {
  fetchOnboardees(): any {
    return of([])
  }
}