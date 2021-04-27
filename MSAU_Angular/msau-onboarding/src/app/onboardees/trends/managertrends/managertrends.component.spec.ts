import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { OnboardeeService } from '../../onboardee.service';

import { ManagertrendsComponent } from './managertrends.component';

describe('ManagertrendsComponent', () => {
  let component: ManagertrendsComponent;
  let fixture: ComponentFixture<ManagertrendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagertrendsComponent],
      providers: [
        { provide: OnboardeeService, useClass: OnboardeeServiceStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagertrendsComponent);
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
  fetchManagerTrends(): any {
    return of([]);
  }
}