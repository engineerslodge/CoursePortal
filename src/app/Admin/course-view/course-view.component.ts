import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/Shared/api-data.service';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.css']
})
export class CourseViewComponent {
loader:boolean =false;
Course:any=[];
limitWords  : any;
DataLength : any;
allCategory:any =[];
selectedOption: string = '';
searchText: string = '';
filteredCourses: any[] = [];
GetData:any =[];
  // Pagination variables
  currentPage: number = 1;
  pageSize: number = 60;

constructor(private apiservice:ApiDataService, private router : Router){}
ngOnInit(){
this.GetCourses();
this.GetAllCategory();
this.DashBoard();
}


DashBoard(){
  this.loader =true;
  this.apiservice.AdminDashboard(localStorage.getItem("accesskey")).subscribe({
    next:(d)=>{
      this.loader =false;
      this.GetData =d[0];
      console.log(d);
    }, error:(err)=>{
      this.loader =false;
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
    this.GetCourses();
    return; // Stop further processing if search text is empty
  }
    this.Course = this.Course.filter((course: any) =>  // Explicitly declare the type here
      course.CourseTitle.toLowerCase().includes(search) || course.CourseDescription.toLowerCase().includes(search)
    );
 
}

getTimeIn12HourFormat(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}

onDropdownChange(){
if(this.selectedOption === ''){
  this.GetCourses();
  return;
}
this.loader = true;
this.apiservice.GetCourseByCategory(localStorage.getItem('accesskey'),this.selectedOption).subscribe({
  next:(d)=>{
    this.loader=false;
    this.Course = d;
    this.DataLength =d.length
  }, error:(err)=>{
    console.log(err);
    this.loader =false;
  }
});
}

transform(value: string, limit: number): string {
  const words = value.split(' ');
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  } else {
    return value;
  }
}

GetCourses(){
  this.loader=true;
  this.apiservice.GetCourse(localStorage.getItem('accesskey')).subscribe({
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

    hover(data:any){
      alert("Course Description : \n" +data)
    }

    Join(data:any){
      this.apiservice.setData(data);
      this.loader =false;
      this.router.navigate(['/Livecam']);
    }
}
