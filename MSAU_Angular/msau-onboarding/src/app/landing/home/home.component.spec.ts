import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from 'src/app/core/login/login.service';
import { Location } from "@angular/common"
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule.withRoutes([
        { path: 'login', component: DummyComponent }
      ])],
      providers: [
        { provide: LoginService, useClass: LoginServiceStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
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

  it('should contain atleast one image', () => {
    const buttonDes = fixture.debugElement.queryAll(By.css("img"))
    expect(buttonDes.length >= 1).toBeTruthy()
  })

  it('should naviagte to / before button click', () => {
    const location = TestBed.inject(Location)
    expect(location.path()).toBe("");
  })

  it('should navigate to login on button click', () => {
    const location = TestBed.inject(Location)
    const linkDes = fixture.debugElement.query(By.css("button"))
    const nativeButton: HTMLButtonElement = linkDes.nativeElement;
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
    return true;
  }
}
