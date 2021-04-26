import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  url: string = "";
  fullurl: string = "";
  constructor(private router: Router) { }
  toggle: boolean = false
  ngOnInit(): void {
    this.url = this.router.url.split("/")[1];
    this.fullurl = this.router.url;
    console.log(this.router.url)
  }
  toggleMenu(): void {
    this.toggle = !this.toggle
  }
}
