import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataService } from '../Shared/api-data.service';
<<<<<<< HEAD
import { ToastrService } from 'ngx-toastr';
=======
>>>>>>> 454fe35 (First Complete Project Push)

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  loader : boolean =false;
  LoginData: any = []; 

<<<<<<< HEAD
  constructor(private router :Router, private apiservices:ApiDataService, private toastr:ToastrService){}
=======
  constructor(private router :Router, private apiservices:ApiDataService){}
>>>>>>> 454fe35 (First Complete Project Push)
  ngOnInit(){

  }
  
  Register(name:any,email:any,password:any){
    if (name !=='' && email !== '' && password !== '') { // Check if both email and password are not empty
  
      let Data={
        'Fullname' : name,
        'Email' : email,
        'Password' : password
      }
  
      this.loader = true;
<<<<<<< HEAD
      // console.log(Data);
      this.apiservices.Register(Data).subscribe({
        next:(d)=>{            
          this.loader =false;
          this.toastr.success("Welcome to Project Rewire Studio!, We will Redirect you to Login for access");
          this.router.navigate(["/Login"]);
        },
        error:(err)=>{
          this.toastr.error("Invalid Registration Credentials , You may want to try different Email");
=======
      console.log(Data);
      this.apiservices.Register(Data).subscribe({
        next:(d)=>{            
          this.loader =false;
          alert("Welcome to Project Rewire Studio!, We will Redirect you to Login for access");
          this.router.navigate(["/Login"]);
        },
        error:(err)=>{
          alert("Invalid Registration Credentials , You may want to try different Email");
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