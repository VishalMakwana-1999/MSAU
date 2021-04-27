import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from '../login/login.service';

import { AuthGuardService } from './auth-guard.service';


describe('AuthGuardService', () => {
  let service: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuardService,
        { provide: LoginService, useClass: LoginServiceStub }]
    });
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check if true when loggedIn', () => {
    expect(service.canActivate()).toBeTrue()
  })


});

class LoginServiceStub {
  alreadyLoggedIn(): any {
    return true
  }
}