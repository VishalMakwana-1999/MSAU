import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './landing/home/home.component';
import { LoginComponent } from './landing/login/login.component';
import { AddOnboardeeComponent } from './onboardees/add-onboardee/add-onboardee.component';
import { OnboardeeDetailComponent } from './onboardees/onboardee-detail/onboardee-detail.component';
import { OnboardeesComponent } from './onboardees/onboardees.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, pathMatch: 'full'
  },
  { path: "login", component: LoginComponent },
  { path: "onboardees", component: OnboardeesComponent, pathMatch: 'full' },
  { path: "onboardees/create", component: AddOnboardeeComponent },
  { path: "onboardees/:id", component: OnboardeeDetailComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
