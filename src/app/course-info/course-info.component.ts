import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { ApiDataService } from '../Shared/api-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent {
  loader:boolean =false;
  name : any ;
  getDashboard :any =[];
  getDashboard2 : any =[];
  currentDateTime: string = '';
  allCategory : any =[];
  selectedOption : any;
  
  constructor(private apiservice :ApiDataService, private route : ActivatedRoute, private router : Router, private toastr :ToastrService){}
  ngOnInit(){
    this.name = localStorage.getItem("customername");   
    interval(1000).subscribe(() => {
      this.updateCurrentDateTime();
    });

    this.route.params.subscribe((params) => {
      this.selectedOption = params['id'];
     this.GetData(this.selectedOption);
  
    });
  }
  
  
updateCurrentDateTime() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');

  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');

  this.currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

GetData(data:any){
  this.loader= true;
  this.apiservice.GetCoursesByID(data).subscribe({
    next:(d)=>{
      this.loader =false;
      this.allCategory =d[0];
      console.log(this.allCategory)
      this.toastr.info("Fetching Complete...");
    },
    error:(err)=>{
      this.loader =false;
      this.toastr.error("Error Fetching Result ..")
    }
  });

}

JoinNow(data:any){
  // check Payment Before any Process 
this.loader=true;
this.apiservice.CheckPayment(localStorage.getItem("accesskey")).subscribe({
  next:(d)=>{
this.loader =false;
if(d === "true")
{
       const currentTime = new Date();
        const currentHours = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();

        // Parse time from the database
        const [dbHours, dbMinutes] = data.SetTime.split(':').map(Number);

        // Calculate the difference in minutes
        const differenceInMinutes = (dbHours - currentHours) * 60 + (dbMinutes - currentMinutes);
        // currentHours === dbHours && currentMinutes === dbMinutes
        if (Math.abs(differenceInMinutes) <= 5)
        { this.apiservice.setData(data);
          // Add to Class history
          let obj ={
            "accesskey" : localStorage.getItem("accesskey"),
            "CourseTitle" : data.CourseTitle,
            "CourseCategory" : data.CourseCategory,
            "SetTime" : data.SetTime,
            "EndTime" : '',
            "Notes" : '',
          }
          this.loader = true;
          this.apiservice.PostClassHistory(obj).subscribe({
            next:(d)=>{
              this.loader =false;
              this.router.navigate(['/Livecam']);
            },
            error:(err)=>{
              this.loader =false;
             alert("You Dont Have Access to re-Watch this Program!")
            }
          });                    
             
        }
        else 
        {
          this.apiservice.setData(differenceInMinutes);
          this.router.navigate(['/WaitingRoom']);
        }
      }
      else {
        this.router.navigate(['/PayNow']);
      }

      }, error:(err)=>{
        this.loader =false;
      }
    });
}


}
