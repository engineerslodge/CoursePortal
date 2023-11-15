import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/Shared/api-data.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  loader:boolean =false;
  Course:any=[];
  limitWords  : any;
  DataLength : any;
  allCategory:any =[];
  selectedOption: string = '';
  searchText: string = '';
  filteredCourses: any[] = [];
  currentPage: number = 1;
  pageSize: number = 50;
  selectedDays : any ;
  Category : any =[];  
  selectedDate: any;
  report :any;
  constructor(private apiservice :ApiDataService, private router : Router){ }
  ngOnInit(){
    this.GetAllCategory();
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayName = daysOfWeek[dayOfWeek];
    this.GetCourses(todayName);
    this.report = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    //alert(todayName);
  }

  GetAllCategory(){
    this.loader = true;
    this.apiservice.GetCategory(localStorage.getItem("accesskey")).subscribe({
      next:(d)=>{
       // console.log(d);
        this.loader =false;
        this.Category = d;
      },
      error:(er)=>{
        this.loader =false;
      }
    });
  }
  

  GetCourses(days:any){
    this.loader=true;
    this.apiservice.GetCourse2(localStorage.getItem('accesskey'),days).subscribe({
      next:(d)=>{
        this.loader=false;
        this.Course = d;
        console.log(d);
      } , error:(err)=>{
        console.log(err);
        this.loader = false;
      }
    });
  
      }

  get totalItems(): number {
    return this.Course.length;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }


  onInputChange(){

    const search = this.searchText.toLowerCase().trim();
   if (search === '') {
    
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayName = daysOfWeek[dayOfWeek];
    this.GetCourses(todayName);
    this.report = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

      return; // Stop further processing if search text is empty
    }

      this.Course = this.Course.filter((course: any) =>  // Explicitly declare the type here
        course.CourseTitle.toLowerCase().includes(search) ||course.days.toLowerCase().includes(search)|| course.CourseCategory.toLowerCase().includes(search)
      );
   
  }


  onDateChange() {
    const dateObject = new Date(this.selectedDate + 'T00:00:00'); // Convert to a date object
    const dayOfWeek = dateObject.toLocaleDateString('en-US', { weekday: 'long' }); // Get the day of the week
    const search = dayOfWeek.toLowerCase().trim();   
    this.GetCourses(search);
    this.report = dateObject.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  }


}


