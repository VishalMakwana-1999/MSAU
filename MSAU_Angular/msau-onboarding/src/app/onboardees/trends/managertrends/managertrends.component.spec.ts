import { ComponentFixture, TestBed } from '@angular/core/testing';
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
});

class OnboardeeServiceStub {
  fetchManagerTrends(): any {
    return of([]);
  }
}