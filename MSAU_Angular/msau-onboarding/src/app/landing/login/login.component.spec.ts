import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from 'src/app/core/login/login.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule],
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
    fixture.detectChanges()
    fixture.whenStable().then(() => {
      expect(component.loggedIn).toBeTrue()
    })
  })
});

class LoginServiceStub {
  alreadyLoggedIn(): any {
    return true
  }
  signInWithGoogle(): any {

  }
}
