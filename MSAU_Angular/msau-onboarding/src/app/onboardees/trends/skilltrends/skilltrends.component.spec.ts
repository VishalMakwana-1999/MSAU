import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkilltrendsComponent } from './skilltrends.component';

describe('SkilltrendsComponent', () => {
  let component: SkilltrendsComponent;
  let fixture: ComponentFixture<SkilltrendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkilltrendsComponent ]
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
