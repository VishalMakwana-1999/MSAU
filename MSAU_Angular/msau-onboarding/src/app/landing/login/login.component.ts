import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser, GoogleLoginProvider } from "angularx-social-login"
import { Router } from "@angular/router"
import { LoginService } from 'src/app/core/login/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: String = "";
  loggedIn: boolean = false;
  constructor(private authService: SocialAuthService, private router: Router, private loginService: LoginService) { }
  ngOnInit(): void {
    if (this.loginService.alreadyLoggedIn()) {
      this.router.navigate(['onboardees'])
    }
  }
  ngDoCheck(): void {
    if (this.loginService.alreadyLoggedIn()) {
      this.router.navigate(['onboardees'])
    }
  }
  signInWithGoogle(): any {
    this.loginService.signInWithGoogle()
  }

  signOut(): any {
    this.loginService.signOut();
    localStorage.clear()
  }
}
