import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { LoginService } from '../core/login/login.service';
import { OnboardeeService } from './onboardee.service';
@Component({
  selector: 'app-onboardees',
  templateUrl: './onboardees.component.html',
  styleUrls: ['./onboardees.component.css']
})
export class OnboardeesComponent implements OnInit {
  user: String = ""
  onboardee_list: any;
  constructor(private router: Router, private loginService: LoginService, private onboardeeService: OnboardeeService) { }
  onboardees = [
    {
      id: 1,
      name: "Vishal Makwana",
      email: "vishalmakwana@accolitedigital.com"
    },
    {
      id: 2,
      name: "Vishal Makwana2",
      email: "vishalmakwana@accolitedigital.com"
    },
    {
      id: 3,
      name: "Vishal Makwana3",
      email: "vishalmakwana@accolitedigital.com"
    },

  ]
  ngOnInit(): void {
    if (this.loginService.alreadyLoggedIn()) {
      this.user != this.loginService.alreadyLoggedIn();
      this.onboardeeService.fetchOnboardees().subscribe((data: any) => {
        this.onboardee_list = data;
        console.log(data)
      })
    }
    else {
      this.router.navigate(['login'])
    }

  }


}
