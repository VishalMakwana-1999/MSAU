import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagertrendsComponent } from './managertrends.component';

describe('ManagertrendsComponent', () => {
  let component: ManagertrendsComponent;
  let fixture: ComponentFixture<ManagertrendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagertrendsComponent ]
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
