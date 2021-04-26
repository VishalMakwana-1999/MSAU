import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationtrendsComponent } from './locationtrends.component';

describe('LocationtrendsComponent', () => {
  let component: LocationtrendsComponent;
  let fixture: ComponentFixture<LocationtrendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationtrendsComponent ]
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
