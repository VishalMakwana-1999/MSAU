import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { OnboardeeService } from '../../onboardee.service';

import { YeartrendsComponent } from './yeartrends.component';

describe('YeartrendsComponent', () => {
  let component: YeartrendsComponent;
  let fixture: ComponentFixture<YeartrendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YeartrendsComponent],
      providers: [
        { provide: OnboardeeService, useClass: OnboardeeServiceStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YeartrendsComponent);
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
  fetchYearTrends(): any {
    return of([])
  }
}
