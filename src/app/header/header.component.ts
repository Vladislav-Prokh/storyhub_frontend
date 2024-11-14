import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth_service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  isUserAutorized:boolean = false;
  constructor(private authService:AuthService){}

  ngOnInit(): void {
    this.checkIfAuth();
  }

  checkIfAuth(){

    if(this.authService.getToken()){
      this.isUserAutorized = true;
    }
    else{
      this.isUserAutorized = false;
    }
  }

  onLogoutClick() {
    this.authService.logout();
    this.checkIfAuth();
  }
}
