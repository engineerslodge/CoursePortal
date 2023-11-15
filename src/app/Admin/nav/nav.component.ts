import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/Shared/api-data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

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
