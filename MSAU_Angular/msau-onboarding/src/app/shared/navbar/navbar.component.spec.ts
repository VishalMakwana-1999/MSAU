import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginService } from 'src/app/core/login/login.service';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [{
        provide: LoginService, useClass: LoginServiceStub
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class LoginServiceStub {
  alreadyLoggedIn(): any {
    return true
  }
}