import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { OnboardeeService } from "../../onboardee.service"

@Component({
  selector: 'app-managertrends',
  templateUrl: './managertrends.component.html',
  styleUrls: ['./managertrends.component.css']
})
export class ManagertrendsComponent implements OnInit {

  constructor(private onboardeeService: OnboardeeService) { }
  @ViewChild("chart") chart: any;

  public chartOptions: any;
  ngOnInit(): void {
    this.onboardeeService.fetchManagerTrends().subscribe((data: any) => {
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
          colors: ['#173f5f', '#173f5f', '#173f5f']
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        }, title: {
          text: "Manager Trends"
        },
        dataLabels: {
          enabled: true,
        },
        xaxis: {
          categories: data.manager,

        }
      };
    })

  }
}


