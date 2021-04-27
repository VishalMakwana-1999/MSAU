import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-onboardee-card',
  templateUrl: './onboardee-card.component.html',
  styleUrls: ['./onboardee-card.component.css']
})
export class OnboardeeCardComponent implements OnInit {
  @Input() onboardee: any;
  @Input() deleteId: any
  constructor() { }

  ngOnInit(): void {
  }
  deleteById(id: number) {
    this.deleteId(id);
  }
}
