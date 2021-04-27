import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarComponent } from 'src/app/shared/sidebar/sidebar.component';
import { LocationtrendsComponent } from './locationtrends/locationtrends.component';
import { ManagertrendsComponent } from './managertrends/managertrends.component';
import { SkilltrendsComponent } from './skilltrends/skilltrends.component';

import { TrendsComponent } from './trends.component';

describe('TrendsComponent', () => {
  let component: TrendsComponent;
  let fixture: ComponentFixture<TrendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrendsComponent, SidebarComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain an h3 tag', () => {
    const h3element = fixture.debugElement.query(By.css('h3'));
    expect(h3element.nativeElement.textContent).toBe("Trends")
  })


  it('should have at least one chart', () => {
    const chartelem = fixture.debugElement.queryAll(By.css('.col-lg-6'))
    expect(chartelem.length >= 1).toBeTruthy();
  }
  )
});
