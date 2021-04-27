import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-onboardee-card',
  templateUrl: './onboardee-card.component.html',
  styleUrls: ['./onboardee-card.component.css']
})
export class OnboardeeCardComponent implements OnInit {
  @Input() Input_onboardee: any;
  onboardee: any;
  @Input() deleteId: any
  constructor() { }

  ngOnInit(): void {
    this.onboardee = this.Input_onboardee;
  }
  deleteById(id: number) {
    this.deleteId(id);
  }
}
