import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
@Component({
  selector: 'app-onboardee-detail',
  templateUrl: './onboardee-detail.component.html',
  styleUrls: ['./onboardee-detail.component.css']
})
export class OnboardeeDetailComponent implements OnInit {

  constructor(private router: Router) { }
  id: string = "";
  onboardee: any;
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
    this.id = this.router.url.split("/")[2]
    this.onboardees.map(item => {
      if (item.id == parseInt(this.id)) {
        this.onboardee = item
      }
    })
  }
}
