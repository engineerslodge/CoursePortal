<<<<<<< HEAD
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataService } from '../Shared/api-data.service';
import { ToastrService } from 'ngx-toastr';

=======
import { Component } from '@angular/core';
>>>>>>> 454fe35 (First Complete Project Push)

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
<<<<<<< HEAD
  styleUrls: ['./sidebar.component.css'],
  
})
export class SidebarComponent {
  loader:boolean =false;
  allCategory : any =[];
  @Output() toggleSidebar = new EventEmitter<void>()
  constructor(private router  : Router, private apiservice:ApiDataService, private toastr : ToastrService){}
  
    ngOnInit(){    
    this.GetAllCategory();
  }
  
GetAllCategory(){
  this.loader = true;
  this.apiservice.GetCategory(localStorage.getItem("accesskey")).subscribe({
    next:(d)=>{
    //  console.log(d);
      this.loader =false;
      this.allCategory = d;
    //  console.log(d);
    },
    error:(er)=>{
      this.loader =false;
    }
  });
} 

Redirect(data:any){
 this.toastr.success("You are Currently Redirected to "+data);
 this.router.navigate(['/Library', data]);
}


}
=======
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

}
>>>>>>> 454fe35 (First Complete Project Push)
