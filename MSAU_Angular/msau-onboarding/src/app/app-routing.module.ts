import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './landing/home/home.component';
import { LoginComponent } from './landing/login/login.component';
import { AddOnboardeeComponent } from './onboardees/add-onboardee/add-onboardee.component';
import { OnboardeeDetailComponent } from './onboardees/onboardee-detail/onboardee-detail.component';
import { OnboardeesComponent } from './onboardees/onboardees.component';
import { AuthGuardService as AuthGuard } from "./core/auth/auth-guard.service"
import { TrendsComponent } from './onboardees/trends/trends.component';
const routes: Routes = [
  {
    path: '', component: HomeComponent, pathMatch: 'full'
  },
  { path: "login", component: LoginComponent },
  { path: "onboardees", component: OnboardeesComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: "onboardees/create", component: AddOnboardeeComponent, canActivate: [AuthGuard] },
  { path: "onboardees/trends", component: TrendsComponent, canActivate: [AuthGuard] },
  { path: "onboardees/:id", component: OnboardeeDetailComponent, canActivate: [AuthGuard] },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
