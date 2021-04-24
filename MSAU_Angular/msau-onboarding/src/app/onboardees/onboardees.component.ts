import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { LoginService } from '../core/login/login.service';
import { OnboardeeService } from './onboardee.service';

import { FormBuilder, Validators, FormArray, Form } from "@angular/forms"
@Component({
  selector: 'app-onboardees',
  templateUrl: './onboardees.component.html',
  styleUrls: ['./onboardees.component.css']
})
export class OnboardeesComponent implements OnInit {
  user: String = ""
  onboardee_list: any;
  loading: boolean = false;
  constructor(private router: Router, private loginService: LoginService, private onboardeeService: OnboardeeService
    , private fb: FormBuilder) { }
  searchForm = this.fb.group({
    'searchName': this.fb.control('')
  })
  ngOnInit(): void {
    this.init()

  }
  init(): void {
    if (this.loginService.alreadyLoggedIn()) {
      this.loading = true;
      this.user != this.loginService.alreadyLoggedIn();
      this.onboardeeService.fetchOnboardees().subscribe((data: any) => {
        this.onboardee_list = data;
        console.log(data)
        this.loading = false;
      })
    }
    else {
      this.router.navigate(['login'])
    }
  }
  update(): void {
    if (this.loginService.alreadyLoggedIn()) {
      this.loading = true;
      this.user != this.loginService.alreadyLoggedIn();
      this.onboardeeService.fetchOnboardees().subscribe((data: any) => {
        this.onboardee_list = data;
        this.loading = false;
      })
    }
    else {
      this.router.navigate(['login'])
    }
  }
  deleteById(id: number): any {
    this.onboardee_list = [];
    this.onboardeeService.deleteOnboardee_byId(id).subscribe((data: any) => {
      console.log(data)
      this.update()
    });

  }

  searchOnBoardee(): any {
    var value = this.searchForm.value.searchName.trim()
    if (value == "") {
      this.init()
    }
    else {
      this.loading = true;
      this.onboardeeService.searchOnboardee(value).subscribe((res: any) => {
        this.onboardee_list = res;
        this.loading = false;
      })
    }
  }


}
