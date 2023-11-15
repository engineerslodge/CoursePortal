import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataService } from '../Shared/api-data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(private router  : Router, private apiservice:ApiDataService){}

  ngOnInit(){
  
  }
  
Logout(){
    localStorage.removeItem('accesskey');
    localStorage.removeItem('customername');
    localStorage.removeItem('email');
    localStorage.removeItem('Wallet');
    this.router.navigate(["/Login"]);
  }
  }
  