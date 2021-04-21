import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { OnboardeeService } from '../onboardee.service';
@Component({
  selector: 'app-onboardee-detail',
  templateUrl: './onboardee-detail.component.html',
  styleUrls: ['./onboardee-detail.component.css']
})
export class OnboardeeDetailComponent implements OnInit {

  constructor(private router: Router, private onboardeeService: OnboardeeService) { }
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
    this.onboardeeService.fetchOnboardees_byId(parseInt(this.id)).subscribe((data: any) => {
      this.onboardee = data;
    })
  }
}
