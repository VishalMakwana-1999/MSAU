import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YeartrendsComponent } from './yeartrends.component';

describe('YeartrendsComponent', () => {
  let component: YeartrendsComponent;
  let fixture: ComponentFixture<YeartrendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YeartrendsComponent ]
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
});
