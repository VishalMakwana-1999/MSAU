import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
@Component({
  selector: 'app-onboardees',
  templateUrl: './onboardees.component.html',
  styleUrls: ['./onboardees.component.css']
})
export class OnboardeesComponent implements OnInit {
  user: String = ""
  constructor(private router: Router) { }
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
    if (localStorage.getItem("user")) {
      this.user != localStorage.getItem("user");
    }
    else {
      this.router.navigate(['login'])
    }
  }

}
