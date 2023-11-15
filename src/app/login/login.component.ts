import { Component } from '@angular/core';
import { ApiDataService } from '../Shared/api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  LoginData : any= [];
  loader : boolean  = false;
  constructor( private apiservices :ApiDataService , private router : Router){}

  ngOnInit(){
   // this.loader =true;
  }
  Login(Email: any, password: any) {
    if (Email !== '' && password !== '') { // Check if both email and password are not empty
    
      let Data={
        'Email' : Email,
        'Password' : password
      }
      this.loader = true;
      this.apiservices.Login(Data).subscribe({
        next:(d)=>{
          this.LoginData = d;
          let fullname = this.LoginData.map((item: any) => item.Fullname);
          let accesskey = this.LoginData.map((item:any) => item.accesskey);
          let email = this.LoginData.map((item:any) => item.email);
          let Role  =  this.LoginData.map((item:any) => item.role);
          localStorage.setItem("customername", fullname);
          localStorage.setItem("accesskey", accesskey);
          localStorage.setItem("email", email);
          localStorage.setItem("role", Role);        
          this.loader =false;
          alert(fullname + ", Welcome to Project Rewire Studio!");
          if(localStorage.getItem("role") === "Customer"){
            this.router.navigate(["/dashboard"]);
          } 
          if(localStorage.getItem("role") === "Admin"){
            this.router.navigate(["/adminHome"]);
          }
          
        },
        error:(err)=>{
          console.log(err);
          alert("Error !, " + err.error.Message);
          this.loader =false;
        }
      });
      
    } else {
      this.loader =false;
      alert("Invalid Credentials Details"); // Display an "Invalid Credentials Details" message
    }
  }
  
}
