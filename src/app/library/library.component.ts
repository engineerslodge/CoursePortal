import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiDataService } from '../Shared/api-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
category:any;
loader:any;
Course : any =[];
DataLength : any = [];
constructor(private route : ActivatedRoute, private apiservice:ApiDataService, private toastr:ToastrService , private router :Router){}

  ngOnInit(){
    this.route.params.subscribe((params) => {
      this.category = params['id'];
     this.GetCourses(this.category);
  
    });
  }

  GetCourses(datas:any)
  {
    this.loader=true;
    this.apiservice.GetCoursesByCat(datas).subscribe({
      next:(d)=>{
        this.loader=false;
        this.Course = d;
        this.DataLength =d.length
      } , error:(err)=>{
        console.log(err);
        this.loader = false;
      }
    });
  
  }
  
  check(data:any){
    //this.toastr.success("You are Currently been Redirected to Course Information Portal");
    this.router.navigate(['/CourseInfo', data]);
  }


}

