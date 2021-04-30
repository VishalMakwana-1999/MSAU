import { Component, OnInit, ViewChild } from '@angular/core';
import { OnboardeeService } from "../../onboardee.service"
@Component({
  selector: 'app-yeartrends',
  templateUrl: './yeartrends.component.html',
  styleUrls: ['./yeartrends.component.css']
})
export class YeartrendsComponent implements OnInit {
  @ViewChild("chart") chart: any;

  public chartOptions: any;
  constructor(private onboardeeService: OnboardeeService) { }
  colorCheme = {
    domain: ["173f5f"]
  }
  ngOnInit(): void {
    this.onboardeeService.fetchYearTrends().subscribe((data: any) => {
      this.chartOptions = {
        series: [
          {
            name: "basic",
            data: data.count
          }
        ],
        chart: {
          type: "line",
          height: 300
        },
        fill: {
          colors: ['#173f5f']
        },
        colors: ['#173f5f'],
        plotOptions: {
          bar: {
            horizontal: true
          }
        }, title: {
          text: "Year Trends"
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: data.year
        }
      };
    })
  }

}
