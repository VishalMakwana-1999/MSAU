import { Component, OnInit, ViewChild } from '@angular/core';
import { OnboardeeService } from "../../onboardee.service"
@Component({
  selector: 'app-locationtrends',
  templateUrl: './locationtrends.component.html',
  styleUrls: ['./locationtrends.component.css']
})
export class LocationtrendsComponent implements OnInit {
  @ViewChild("chart") chart: any;

  public chartOptions: any;
  constructor(private onboardeeService: OnboardeeService) { }

  ngOnInit(): void {
    this.onboardeeService.fetchLocation().subscribe((data: any) => {
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
            horizontal: false
          }
        }, title: {
          text: "Location Trends"
        },
        dataLabels: {
          enabled: true
        },
        xaxis: {
          categories: data.location
        }
      };
    })

  }

}
