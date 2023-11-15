import { Component } from '@angular/core';
import { ApiDataService } from '../Shared/api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {
  loader:boolean = false;
  constructor (private apiservice:ApiDataService , private router :Router){}

  ngOnInit(){

  }

  SendReq(data:any){
    this.loader =true;
    if (data !=='')
    {    const encodedEmail = encodeURIComponent(data);
    this.apiservice.RequestOTP(encodedEmail).subscribe({
     next:(d)=>{
      console.log(d);
      alert("OTP Sent to Email Provided!");
      this.loader =false;
     }, error:(err)=>{
      console.log(err);
      this.loader =false;
     }
    });
  } else{
    alert("Invalid Email Credentials!");
    this.loader =false;
  }
}
  
Request(email:any,password:any,otp:any){

    if (email !=='' && password !=='' && otp !== '')
    {
      this.loader = true;
      let d ={
        "Email" : email,
        "Password" : password ,
        "OTP" : otp
      }
      this.apiservice.ForgotPassword(d).subscribe({
        next:(d)=>{
          alert("Password Changed Successfully!");
          this.loader=false;
        },
        error:(err)=>{
          alert("Invalid Operation, Try Again!");
          this.loader =false;
        }
      });
    }
    else 
    {
      alert("Invalid Credentials!");
    }

  }

}