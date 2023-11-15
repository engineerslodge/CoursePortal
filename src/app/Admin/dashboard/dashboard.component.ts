import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/Shared/api-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
loader : boolean = false;
name:any;
role :any;
GetData :any=[];
constructor(private apiservice :ApiDataService, private router : Router){}

ngOnInit(){
  this.name = localStorage.getItem("customername");
  this.role =localStorage.getItem("role");
  this.DashBoard();
}

DashBoard(){
  this.loader =true;
  this.apiservice.AdminDashboard(localStorage.getItem("accesskey")).subscribe({
    next:(d)=>{
      this.loader =false;
      this.GetData =d[0];
      console.log(d);
    }, error:(err)=>{
      this.loader =false;
    }
  });
}

}
