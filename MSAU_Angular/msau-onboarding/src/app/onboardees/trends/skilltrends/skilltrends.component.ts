import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { OnboardeeService } from "../../onboardee.service"
@Component({
  selector: 'app-skilltrends',
  templateUrl: './skilltrends.component.html',
  styleUrls: ['./skilltrends.component.css']
})
export class SkilltrendsComponent implements OnInit {
  @ViewChild("chart") chart: any;

  public chartOptions: any;
  constructor(private onboardeeService: OnboardeeService) { }

  ngOnInit(): void {
    this.onboardeeService.fetchSkills().subscribe((data: any) => {
      this.chartOptions = {
        series: [
          {
            name: "basic",
            data: data.count
          }
        ],
        chart: {
          type: "bar",
          height: 300
        },
        fill: {
          colors: ['#173f5f']
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        }, title: {
          text: "Skill Trends"
        },
        dataLabels: {
          enabled: true
        },
        xaxis: {
          categories: data.skills
        }
      };
    })

  }

}
