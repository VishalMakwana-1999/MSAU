import { ComponentFixture, TestBed } from '@angular/core/testing';
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
});

class OnboardeeServiceStub {
  fetchLocation(): any {
    return of([])
  }
}