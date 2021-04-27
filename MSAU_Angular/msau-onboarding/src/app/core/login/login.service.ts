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
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
  signInWithGoogle(): any {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res) => {
      localStorage.setItem("token", res.idToken);
    })
  }
  signOut(): any {
    this.authService.signOut();
    localStorage.clear();
  }
}
