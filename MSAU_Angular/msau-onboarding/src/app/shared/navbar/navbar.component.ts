import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from "../../core/login/login.service"
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean = false;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.loggedIn = true;
    }
  }
  ngDoCheck(): void {
    if (localStorage.getItem('user')) {
      this.loggedIn = true;
    }
  }
  logOut(): any {
    localStorage.clear();
    this.loginService.signOut()
    this.loggedIn = false
  }
}
