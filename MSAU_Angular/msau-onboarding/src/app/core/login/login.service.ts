import { Injectable } from '@angular/core';
import { SocialAuthService, SocialUser, GoogleLoginProvider } from "angularx-social-login"

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: SocialUser = new SocialUser;
  loggedIn: boolean = false;
  constructor(private authService: SocialAuthService) { }
  alreadyLoggedIn(): any {
    this.authService.authState.subscribe(user => {
      this.user = user;
      this.loggedIn = (user != null);
    })
  }
  signInWithGoogle(): any {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res) => {
      console.log(res);
      localStorage.setItem("user", res.email);
    })
  }
  signOut(): any {
    this.authService.signOut();
    localStorage.clear();
  }
}
