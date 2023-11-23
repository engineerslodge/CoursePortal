import { Component } from '@angular/core';
import { ApiDataService } from '../Shared/api-data.service';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { ToastrService } from 'ngx-toastr';
=======
>>>>>>> 454fe35 (First Complete Project Push)

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  LoginData : any= [];
  loader : boolean  = false;
<<<<<<< HEAD
  constructor( private apiservices :ApiDataService , private router : Router, private toastr:ToastrService){}
=======
  constructor( private apiservices :ApiDataService , private router : Router){}
>>>>>>> 454fe35 (First Complete Project Push)

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
<<<<<<< HEAD
          this.toastr.success(fullname + ", Welcome to Project Rewire Studio!");
=======
          alert(fullname + ", Welcome to Project Rewire Studio!");
>>>>>>> 454fe35 (First Complete Project Push)
          if(localStorage.getItem("role") === "Customer"){
            this.router.navigate(["/dashboard"]);
          } 
          if(localStorage.getItem("role") === "Admin"){
            this.router.navigate(["/adminHome"]);
          }
          
        },
        error:(err)=>{
<<<<<<< HEAD
          // console.log(err);
          this.toastr.error("Error !, " + err.error.Message);
=======
          console.log(err);
          alert("Error !, " + err.error.Message);
>>>>>>> 454fe35 (First Complete Project Push)
          this.loader =false;
        }
      });
      
    } else {
      this.loader =false;
<<<<<<< HEAD
      this.toastr.error("Invalid Credentials Details"); // Display an "Invalid Credentials Details" message
=======
      alert("Invalid Credentials Details"); // Display an "Invalid Credentials Details" message
>>>>>>> 454fe35 (First Complete Project Push)
    }
  }
  
}
