import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions } from "./chart.model"


@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit {
  @ViewChild("chart") chart: any;

  public chartOptions: any;
  constructor() {

  }

  ngOnInit(): void {
  }

}
