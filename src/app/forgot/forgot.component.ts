import { Component } from '@angular/core';
import { ApiDataService } from '../Shared/api-data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {
  loader:boolean = false;
  Requesting :boolean =false;
  GetCode : boolean =true;
  constructor (private apiservice:ApiDataService , private router :Router, private toastr :ToastrService){}

  ngOnInit(){

  }

  SendReq(data:any){
    this.loader =true;
    if (data !=='')
    {    const encodedEmail = encodeURIComponent(data);
    this.apiservice.RequestOTP(encodedEmail).subscribe({
     next:(d)=>{
     //console.log(d);
      this.toastr.success("OTP Sent to Email Provided!");
      this.Requesting = true;
      this.GetCode =false;
      this.loader =false;
     }, error:(err)=>{
      console.log(err);
      this.loader =false;
     }
    });
  } else{
    this.toastr.error("Invalid Email Credentials!");
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
          this.toastr.success("Password Changed Successfully!");
          this.toastr.info("Please Proceed to Login");
          this.loader=false;
        },
        error:(err)=>{
          this.toastr.error("Invalid Operation, Try Again!");
          this.loader =false;
        }
      });
    }
    else 
    {
      this.toastr.error("Invalid Credentials!");
    }

  }

}