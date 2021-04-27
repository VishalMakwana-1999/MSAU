import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from 'src/app/core/login/login.service';
import { Location } from "@angular/common"
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule.withRoutes([
        { path: 'onboardees', component: DummyComponent },
        { path: 'login', component: DummyComponent }
      ])],
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

  it('should logout on click', () => {
    component.logOut();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.loggedIn).toBeFalsy()
    })
  })

  it('should navigate to home on home click', () => {
    const location = TestBed.inject(Location)
    const linkDes = fixture.debugElement.queryAll(By.css(".nav-link"))
    const nativeButton: HTMLButtonElement = linkDes[0].nativeElement;
    nativeButton.click();
    fixture.detectChanges()
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/')
    })
  })
  it('should navigate to Sign IN on SignIn click', () => {
    const location = TestBed.inject(Location)
    const linkDes = fixture.debugElement.queryAll(By.css(".nav-link"))
    const nativeButton: HTMLButtonElement = linkDes[1].nativeElement;
    nativeButton.click();
    fixture.detectChanges()
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/login')
    })
  })
});
@Component({ template: '' })
class DummyComponent { }
class LoginServiceStub {
  alreadyLoggedIn(): any {
    return true
  }

  signOut(): any {

  }
}