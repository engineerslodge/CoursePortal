<<<<<<< HEAD
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DefaultIterableDiffer, ElementRef, EventEmitter, NgZone, Output, Renderer2, ViewEncapsulation } from '@angular/core';
=======
import { Component, DefaultIterableDiffer } from '@angular/core';
>>>>>>> 454fe35 (First Complete Project Push)
import { ApiDataService } from '../Shared/api-data.service';
import { interval } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-dash-board',
  templateUrl: './customer-dash-board.component.html',
<<<<<<< HEAD
  styleUrls: ['./customer-dash-board.component.css'],
  encapsulation: ViewEncapsulation.None, // Add this li
=======
  styleUrls: ['./customer-dash-board.component.css']
>>>>>>> 454fe35 (First Complete Project Push)
})
export class CustomerDashBoardComponent {
loader:boolean =false;
name : any ;
getDashboard :any =[];
getDashboard2 : any =[];
currentDateTime: string = '';
allCategory : any =[];
selectedOption : any=[];
<<<<<<< HEAD
isSidebarOpen: boolean = false;

constructor(private apiservice :ApiDataService,private ngZone: NgZone, private router : Router,private cdr: ChangeDetectorRef, private renderer: Renderer2, private el: ElementRef){}

=======

constructor(private apiservice :ApiDataService, private router : Router){}
>>>>>>> 454fe35 (First Complete Project Push)
ngOnInit(){
  this.name = localStorage.getItem("customername");
  this.GetAllCategory();
  this.Dashboard();
  this.Tolerance();
  interval(1000).subscribe(() => {
    this.updateCurrentDateTime();
  });
<<<<<<< HEAD

}



=======
}

>>>>>>> 454fe35 (First Complete Project Push)
Dashboard(){
this.loader =true;
this.apiservice.GetInfor(localStorage.getItem("accesskey")).subscribe({
  next:(d)=>{
    this.getDashboard =d[0];
<<<<<<< HEAD
  //  console.log(d);
    this.loader =false;
  },
  error:(err)=>{
  // console.log(err);
=======
    console.log(d);
    this.loader =false;
  },
  error:(err)=>{
    console.log(err);
>>>>>>> 454fe35 (First Complete Project Push)
    this.loader=false;
  }
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


GetAllCategory(){
  this.loader = true;
  this.apiservice.GetCategory(localStorage.getItem("accesskey")).subscribe({
    next:(d)=>{
<<<<<<< HEAD
     // console.log(d);
      this.loader =false;
      this.allCategory = d;
    //  console.log(d);
=======
      console.log(d);
      this.loader =false;
      this.allCategory = d;
      console.log(d);
>>>>>>> 454fe35 (First Complete Project Push)
    },
    error:(er)=>{
      this.loader =false;
    }
  });
}

Join(data:any){  
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
        if(  currentHours === dbHours && currentMinutes === dbMinutes)
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


Tolerance(){
  this.loader =true;
  this.apiservice.Tolerance().subscribe({
    next:(d)=>{
      this.loader =false;
     // console.log(d);
      this.getDashboard2 =d;
    },
    error:(err)=>{
      this.loader =false;
<<<<<<< HEAD
   //   console.log(err);
    }
  });
}



onToggleSidebar(): void {  
  this.apiservice.toggleSidebar();
}



=======
      console.log(err);
    }
  });
}
>>>>>>> 454fe35 (First Complete Project Push)
}
