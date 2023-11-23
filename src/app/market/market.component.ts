import { Component } from '@angular/core';
import { ApiDataService } from '../Shared/api-data.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent {
  loader:boolean =false;
  Course:any=[];
  limitWords  : any;
  DataLength : any;
  allCategory:any =[];
  selectedOption: string = '';
  searchText: string = '';
  filteredCourses: any[] = [];
  getDashboard :any=[];
    // Pagination variables
    currentPage: number = 1;
    pageSize: number = 60;
  
  constructor(private apiservice:ApiDataService){}
  ngOnInit(){
  this.GetCourses();
  this.GetAllCategory();
  this.Dashboard();
  
  }
  
  get totalItems(): number {
    return this.Course.length;
  }
  
  onPageChange(page: number): void {
    this.currentPage = page;
  }
  
  Dashboard(){
    this.loader =true;
    this.apiservice.GetInfor(localStorage.getItem("accesskey")).subscribe({
      next:(d)=>{
        this.getDashboard =d[0];
<<<<<<< HEAD
     //   console.log(d);
        this.loader =false;
      },
      error:(err)=>{
    //   // console.log(err);
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
<<<<<<< HEAD
   //  // console.log(err);
=======
      console.log(err);
>>>>>>> 454fe35 (First Complete Project Push)
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
<<<<<<< HEAD
       // console.log(err);
=======
        console.log(err);
>>>>>>> 454fe35 (First Complete Project Push)
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
        alert("Description : \n" +data)
      }
<<<<<<< HEAD

      onToggleSidebar(): void {  
        this.apiservice.toggleSidebar();
      }
=======
>>>>>>> 454fe35 (First Complete Project Push)
  }
  