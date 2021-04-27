import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { OnboardeeService } from '../../onboardee.service';

import { LocationtrendsComponent } from './locationtrends.component';

describe('LocationtrendsComponent', () => {
  let component: LocationtrendsComponent;
  let fixture: ComponentFixture<LocationtrendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationtrendsComponent],
      providers: [
        { provide: OnboardeeService, useClass: OnboardeeServiceStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationtrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have only 1 chart', () => {
    const chartelem = fixture.debugElement.queryAll(By.css('apx-chart'))
    expect(chartelem.length).toBe(1);
  })
});

class OnboardeeServiceStub {
  fetchLocation(): any {
    return of([])
  }
}