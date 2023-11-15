import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/Shared/api-data.service';

@Component({
  selector: 'app-categoory',
  templateUrl: './categoory.component.html',
  styleUrls: ['./categoory.component.css']
})
export class CategooryComponent {
loader:boolean =false;
allCategory : any =[];
constructor(private apiservice :ApiDataService, private router : Router){}
ngOnInit(){
this.GetAllCategory();
}

save(course:any,description:any){
  if (course !== ''  || description !== '')
  {
      let data  = {
        "accesskey" : localStorage.getItem("accesskey"),
        "course" : course,
        "description" : description
      }
      this.loader = true;
      this.apiservice.AdminCategory(data).subscribe({
        next:(d)=>{
          this.loader=false;
          alert("Created Successfully!");
          this.GetAllCategory();
        },
        error:(err)=>{
          alert("This Operation Cannot be fulfiled at this moment! , Code: "+ err.statusText);
          console.log(err);
          this.loader =false;
        }

      });
  }
  else {
    alert("Cannot Save Empty Boxes!");
  }
}

GetAllCategory(){
  this.loader = true;
  this.apiservice.GetCategory(localStorage.getItem("accesskey")).subscribe({
    next:(d)=>{
      console.log(d);
      this.loader =false;
      this.allCategory = d;
    },
    error:(er)=>{
      this.loader =false;
    }
  });
}

DeleteCategory(id:any){
  const confirmationMessage = "Do you want to delete this Category Permanently?";
const confirmationResult = confirm(confirmationMessage);
if(confirmationResult){
  this.loader =true ;
  this.apiservice.DeleteCategory(localStorage.getItem("accesskey"),id).subscribe({
    next:(d)=>{
      this.loader =false;
      alert("Deleted Successfully!");
      this.GetAllCategory();
    }, error:(err)=>{
      this.GetAllCategory();
      this.loader =false;
    }
  });
}}

}
