import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './landing//home/home.component';
import { LoginComponent } from './landing/login/login.component';
import { SocialLoginModule, SocialAuthServiceConfig } from "angularx-social-login"
import { GoogleLoginProvider } from "angularx-social-login"
import { HttpClientModule } from "@angular/common/http"
import { FormsModule } from "@angular/forms"
import { LoginService } from "./core/login/login.service";
import { OnboardeesComponent } from './onboardees/onboardees.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { OnboardeeDetailComponent } from './onboardees/onboardee-detail/onboardee-detail.component';
import { OnboardeeCardComponent } from './onboardees/onboardee-card/onboardee-card.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    OnboardeesComponent,
    SidebarComponent,
    OnboardeeDetailComponent,
    OnboardeeCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('809253675730-qeb2csksq63v59e8jroqm838q9q6371i.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }, LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
