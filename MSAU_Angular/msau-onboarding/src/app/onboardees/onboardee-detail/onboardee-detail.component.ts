import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { OnboardeeService } from '../onboardee.service';
import { FormBuilder, Validators, FormArray } from "@angular/forms"
import { OnboardeeModel } from "../models/onboardee"
@Component({
  selector: 'app-onboardee-detail',
  templateUrl: './onboardee-detail.component.html',
  styleUrls: ['./onboardee-detail.component.css']
})
export class OnboardeeDetailComponent implements OnInit {

  constructor(private router: Router, private onboardeeService: OnboardeeService, private fb: FormBuilder) { }
  id: string = "";
  onboardee: any;
  managers: any;
  bgcStatus: any = ['Idle', 'In Process', 'Completed', 'Failed']
  onboardStatus: any = ['Idle', 'In Process', 'Completed', 'Failed']
  levels: any = ['Beginner', 'Amateur', 'Novice', 'Intermediate', 'Expert']
  response: any;
  loading: boolean = false;
  edit: boolean = false;
  skilllevels: any = [];


  onboardeeForm = this.fb.group({
    fname: ['', Validators.required],
    lname: ['', Validators.required],
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
      this.fb.control('')
    ], Validators.required),
    skillLevel: this.fb.array([
      this.fb.control('')
    ], Validators.required)
  })
  ngOnInit(): void {
    this.id = this.router.url.split("/")[2]
    this.onboardeeService.fetchOnboardees_byId(parseInt(this.id)).subscribe((data: any) => {
      console.log(data)
      var skills = []
      for (var i in data.skills.skillList) {
        skills.push(data.skills.skillList[i].skillName)
        this.skilllevels.push(data.skills.skillList[i].level)
      }
      this.onboardee = data;
      this.onboardeeForm.patchValue({
        'fname': data.fname,
        'lname': data.lname,
        'email': data.email,
        'phone': data.phone,
        'startDate': data.startDate,
        'location': data.location,
        'dob': data.dob,
        'managerId': data.managerId,
        'bgcStatus': data.bgcStatus,
        'onboardStatus': data.onboardStatus,
        'etaCompletion': data.etaCompletion,
        'skills': skills,
        'skillLevel': this.skilllevels
      })
    })
    this.fetchManagers()
  }
  fetchManagers(): void {
    this.onboardeeService.fetchManagers().subscribe((man: any) => {
      this.managers = man;
      console.log(man)
    })
  }
  onSubmit(): any {
    this.edit = false
    this.loading = true;
    var values = this.onboardeeForm.value
    var skillList = [];
    console.log(values.skills)
    for (var index in values.skills) {
      skillList.push({
        'skillName': values.skills[index],
        'level': values.skillLevel[index]
      })
    }
    console.log(skillList)
    var ob: OnboardeeModel = {
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
    /* this.onboardeeService.createOnboardee(ob).subscribe((data: any) => {
      console.log(data)
      this.response = {
        'Status': data.Status,
        'Message': data.Message
      }
      this.loading = false
    }); */
    this.response = {
      'Status': 200,
      'Message': "Success"
    }
    this.loading = false
    console.log(ob)
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

  toggleEdit(): any {
    this.edit = !this.edit
  }
}
