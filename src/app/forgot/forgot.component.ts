import { Component } from '@angular/core';
import { ApiDataService } from '../Shared/api-data.service';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { ToastrService } from 'ngx-toastr';
=======
>>>>>>> 454fe35 (First Complete Project Push)

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {
  loader:boolean = false;
<<<<<<< HEAD
  Requesting :boolean =false;
  GetCode : boolean =true;
  constructor (private apiservice:ApiDataService , private router :Router, private toastr :ToastrService){}
=======
  constructor (private apiservice:ApiDataService , private router :Router){}
>>>>>>> 454fe35 (First Complete Project Push)

  ngOnInit(){

  }

  SendReq(data:any){
    this.loader =true;
    if (data !=='')
    {    const encodedEmail = encodeURIComponent(data);
    this.apiservice.RequestOTP(encodedEmail).subscribe({
     next:(d)=>{
<<<<<<< HEAD
     //console.log(d);
      this.toastr.success("OTP Sent to Email Provided!");
      this.Requesting = true;
      this.GetCode =false;
=======
      console.log(d);
      alert("OTP Sent to Email Provided!");
>>>>>>> 454fe35 (First Complete Project Push)
      this.loader =false;
     }, error:(err)=>{
      console.log(err);
      this.loader =false;
     }
    });
  } else{
<<<<<<< HEAD
    this.toastr.error("Invalid Email Credentials!");
=======
    alert("Invalid Email Credentials!");
>>>>>>> 454fe35 (First Complete Project Push)
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
<<<<<<< HEAD
    }
    this.apiservice.ForgotPassword(d).subscribe({
        next:(d)=>{
          this.toastr.success("Password Changed Successfully!");
          this.toastr.info("Please Proceed to Login");
          this.loader=false;
        },
        error:(err)=>{
          this.toastr.error("Invalid Operation, Try Again!");
=======
      }
      this.apiservice.ForgotPassword(d).subscribe({
        next:(d)=>{
          alert("Password Changed Successfully!");
          this.loader=false;
        },
        error:(err)=>{
          alert("Invalid Operation, Try Again!");
>>>>>>> 454fe35 (First Complete Project Push)
          this.loader =false;
        }
      });
    }
    else 
    {
<<<<<<< HEAD
      this.toastr.error("Invalid Credentials!");
=======
      alert("Invalid Credentials!");
>>>>>>> 454fe35 (First Complete Project Push)
    }

  }

}