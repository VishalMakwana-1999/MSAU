import { Component, OnInit } from '@angular/core';
import { OnboardeeService } from '../onboardee.service';
import { FormBuilder, Validators, FormArray } from "@angular/forms"
import { OnboardeeModel } from "../models/onboardee"
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-onboardee',
  templateUrl: './add-onboardee.component.html',
  styleUrls: ['./add-onboardee.component.css']
})
export class AddOnboardeeComponent implements OnInit {

  constructor(private onboardeeService: OnboardeeService, private fb: FormBuilder, private router: Router) { }
  managers: any;
  bgcStatus: any = ['Idle', 'In Process', 'Completed', 'Failed']
  onboardStatus: any = ['Idle', 'In Process', 'Completed', 'Failed']
  levels: any = ['Beginner', 'Amateur', 'Novice', 'Intermediate', 'Expert']
  response: any;
  loading: boolean = false;
  ngOnInit(): void {
    this.fetchManagers();
    this.response = null
  }

  fetchManagers(): void {
    this.onboardeeService.fetchManagers().subscribe((man: any) => {
      this.managers = man;
    })
  }

  onboardeeForm = this.fb.group({
    fname: ['', [Validators.required, Validators.minLength(2)]],
    lname: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    dob: ['', Validators.required],
    startDate: ['', Validators.required],
    location: ['', Validators.required],
    managerId: ['', Validators.required],
    bgcStatus: ['', Validators.required],
    onboardStatus: ['', Validators.required],
    etaCompletion: ['', Validators.required],
    skills: this.fb.array([
      this.fb.control('', Validators.required)
    ]),
    skillLevel: this.fb.array([
      this.fb.control('', Validators.required)
    ])
  })
  onSubmit(): any {
    this.loading = true;
    var values = this.onboardeeForm.value
    var skillList = [];
    for (var index in values.skills) {
      skillList.push({
        'skillName': values.skills[index],
        'level': values.skillLevel[index]
      })
    }
    var ob: OnboardeeModel = {
      demandId: null,
      fname: values.fname,
      lname: values.lname,
      email: values.email,
      phone: values.phone,
      dob: values.dob,
      startDate: values.startDate,
      location: values.location,
      managerId: parseInt(values.managerId),
      bgcStatus: values.bgcStatus,
      onboardStatus: values.onboardStatus,
      etaCompletion: values.etaCompletion,
      skills: {
        skillList: skillList
      }
    }
    this.onboardeeService.createOnboardee(ob).subscribe((data: any) => {
      this.response = {
        'Status': data.Status,
        'Message': data.Message
      }
      this.loading = false
    });
  }
  goToDashboard(): any {
    if (this.response.Status == 200) {
      this.router.navigate(['onboardees'])
    }
  }
  get skills(): any {
    return this.onboardeeForm.get('skills') as FormArray;
  }

  addSkills(): void {
    this.skills.push(this.fb.control(''));
  }

  get skillLevel(): any {
    return this.onboardeeForm.get("skillLevel") as FormArray;
  }

  addSkillLevel(): any {
    this.skillLevel.push(this.fb.control(''))
  }
}
