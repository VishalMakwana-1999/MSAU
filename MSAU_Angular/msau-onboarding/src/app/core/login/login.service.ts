import { Injectable } from '@angular/core';
import { SocialAuthService, SocialUser, GoogleLoginProvider } from "angularx-social-login"
import { HttpClient } from "@angular/common/http"
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: SocialUser = new SocialUser;
  loggedIn: boolean = false;
  constructor(private authService: SocialAuthService, private http: HttpClient) { }
  alreadyLoggedIn(): any {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
  signInWithGoogle(): any {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res) => {
      console.log(res)
      this.http.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${res.idToken}`).subscribe((res: any) => {
        console.log(res)
        if (res.Status == 400) {
          console.log(res.error)
        }
        else {
          console.log("True")
          localStorage.setItem('token', res.idToken)
        }
      })
    })
  }
  signOut(): any {
    this.authService.signOut();
    localStorage.clear();
  }

  verifyToken(idToken: string): any {
    this.http.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`).subscribe((res: any) => {
      console.log(res)
      if (res.Status == 400) {
        console.log(res.error)
        return false;
      }
      else {
        console.log("True")
        return true
      }
    })
  }
}
