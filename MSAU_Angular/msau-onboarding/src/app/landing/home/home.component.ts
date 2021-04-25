import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../core/login/login.service"
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedIn: boolean = false;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    if (this.loginService.alreadyLoggedIn()) {
      this.loggedIn = true;
    }
  }

}
