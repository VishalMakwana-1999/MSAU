import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from 'src/app/core/login/login.service';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, NavbarComponent],
      imports: [RouterTestingModule.withRoutes([
        { path: 'onboardees', component: DummyComponent }
      ])],
      providers: [
        { provide: LoginService, useClass: LoginServiceStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain atleast one button', () => {
    const buttonDes = fixture.debugElement.queryAll(By.css("button"))
    expect(buttonDes.length >= 1).toBeTruthy()
  })
  it('should login on click', () => {
    const buttonDes = fixture.debugElement.query(By.css("button"))
    const nativeButton: HTMLButtonElement = buttonDes.nativeElement
    nativeButton.click();
    expect(component.loggedIn).toBeTruthy()
  })
});
@Component({ template: '' })
class DummyComponent { }
class LoginServiceStub {
  alreadyLoggedIn(): any {
    return true
  }
  signInWithGoogle(): any {

  }
}
