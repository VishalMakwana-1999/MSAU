import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { OnboardeeService } from '../../onboardee.service';

import { SkilltrendsComponent } from './skilltrends.component';

describe('SkilltrendsComponent', () => {
  let component: SkilltrendsComponent;
  let fixture: ComponentFixture<SkilltrendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkilltrendsComponent],
      providers: [
        { provide: OnboardeeService, useClass: OnboardeeServiceStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkilltrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class OnboardeeServiceStub {
  fetchSkills(): any {
    return of([])
  }
}
