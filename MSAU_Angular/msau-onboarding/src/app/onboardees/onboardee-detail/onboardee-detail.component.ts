import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { OnboardeeService } from '../onboardee.service';
import { FormBuilder, Validators, FormArray, Form } from "@angular/forms"
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
    ]),
    skillLevel: this.fb.array([
    ])
  })
  fetchById(id: any): any {
    this.onboardeeService.fetchOnboardees_byId(parseInt(id)).subscribe((data: any) => {
      var skills = []
      var skillLevel = []
      const sks = <FormArray>this.onboardeeForm.get('skills')
      const sklevel = <FormArray>this.onboardeeForm.get('skillLevel')
      for (var i in data.skills.skillList) {
        skills.push(data.skills.skillList[i].skillName)
        this.skilllevels.push(data.skills.skillList[i].level)
        skillLevel.push(data.skills.skillList[i].level)
        sks.push(this.fb.control(data.skills.skillList[i].skillName))
        sklevel.push(this.fb.control(data.skills.skillList[i].level))
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
      })
    })
  }
  ngOnInit(): void {
    this.id = this.router.url.split("/")[2]
    this.fetchById(this.id);
    this.fetchManagers()
  }

  refreshValues(): any {
    if (this.response.Status == 204) {
      this.onboardeeForm.patchValue({
        'fname': this.onboardee.fname,
        'lname': this.onboardee.lname,
        'email': this.onboardee.email,
        'phone': this.onboardee.phone,
        'startDate': this.onboardee.startDate,
        'location': this.onboardee.location,
        'dob': this.onboardee.dob,
        'managerId': this.onboardee.managerId,
        'bgcStatus': this.onboardee.bgcStatus,
        'onboardStatus': this.onboardee.onboardStatus,
        'etaCompletion': this.onboardee.etaCompletion,
      })
    }
    else {
      this.router.navigate(["onboardees"])
    }

  }

  fetchManagers(): void {
    this.onboardeeService.fetchManagers().subscribe((man: any) => {
      this.managers = man;
    })
  }
  onSubmit(): any {
    this.edit = false
    this.loading = true;
    var values = this.onboardeeForm.value
    var skillList = [];
    for (var index in values.skills) {
      skillList.push({
        'skillName': values.skills[index],
        'level': values.skillLevel[index]
      })
    }
    console.log(skillList)
    var ob: OnboardeeModel = {
      demandId: this.onboardee.demandId,
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
    this.onboardeeService.updateOnboardee(ob).subscribe((data: any) => {
      console.log(data)
      this.response = {
        'Status': data.Status,
        'Message': data.Message
      }
      this.loading = false
    });
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
