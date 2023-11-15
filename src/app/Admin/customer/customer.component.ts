import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/Shared/api-data.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
loader :boolean =false;
Customers : any =[];
DataLength : any;
currentPage: number = 1;
pageSize: number = 60;
CustData :any=[];
searchText: string = '';
filteredCourses: any[] = [];

constructor(private apiservices:ApiDataService, private router:Router){}
ngOnInit(){
 this.GetCustomer();
 this.Infor();
}

onInputChange(){

  const search = this.searchText.toLowerCase().trim();
 if (search === '') {
    this.GetCustomer();
    return; // Stop further processing if search text is empty
  }
    this.Customers = this.Customers.filter((course: any) =>  // Explicitly declare the type here
      course.Fullname.toLowerCase().includes(search) || course.Email.toLowerCase().includes(search)
    );
 
}

GetCustomer(){
  this.loader =true;
  this.apiservices.AdminGetCustomer(localStorage.getItem("accesskey")).subscribe({
    next:(d)=>{
      this.Customers =d;
      this.DataLength = d.length;
     // console.log(d);
      this.loader=false;
    }, error :(err)=>{
      this.loader =false;
   //   console.log(err);
    }
  });
}

get totalItems(): number {
  return this.Customers.length;
}

onPageChange(page: number): void {
  this.currentPage = page;
}

Trash(data:any){
this.loader = true;
const confirmationMessage = "Do you want to delete this Customer Permanently?";
const confirmationResult = confirm(confirmationMessage);
if(confirmationResult){
  this.apiservices.AdminDeleteCustomer(localStorage.getItem("accesskey"),data).subscribe({
    next:(d)=>{
      this.loader = false;
      alert(" Deleted Successfully !");
      this.GetCustomer();
    }, error:(err)=>{
      this.loader = false;
    }
  });
} else {
  
  alert("Operation Has been Cancelled");
  this.loader =false;
}
}

Infor(){
  this.loader=true;
  this.apiservices.GetCustomersInfor(localStorage.getItem("accesskey")).subscribe({
    next:(d)=>{
      this.loader =false;
      this.CustData =d;
   //   console.log(d);
    },
    error:(err)=>{
      this.loader=false;
    }
  });
}
}
