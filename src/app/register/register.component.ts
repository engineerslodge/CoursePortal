import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataService } from '../Shared/api-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  loader : boolean =false;
  LoginData: any = []; 

  constructor(private router :Router, private apiservices:ApiDataService){}
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
      console.log(Data);
      this.apiservices.Register(Data).subscribe({
        next:(d)=>{            
          this.loader =false;
          alert("Welcome to Project Rewire Studio!, We will Redirect you to Login for access");
          this.router.navigate(["/Login"]);
        },
        error:(err)=>{
          alert("Invalid Registration Credentials , You may want to try different Email");
          this.loader =false;
        }
      });


      
    } else {
      this.loader =false;
      alert("Invalid Credentials Details"); // Display an "Invalid Credentials Details" message
    }
  }
  


}