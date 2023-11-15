import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/Shared/api-data.service';

@Component({
  selector: 'app-upload-course',
  templateUrl: './upload-course.component.html',
  styleUrls: ['./upload-course.component.css']
})
export class UploadCourseComponent {
  loader:boolean =false;
  progressLoader : boolean =false;
  progress: number = -1; // -1 represents no upload in progress
  selectedSamples  : any ;
  Course : any = [];
  Category : any ;
  EditId:any;
  EditTitle:any;
  EditFees :any;
  EditSetTime : any;
  Create:boolean =true;
  selectedFile: File | null = null;
  isRewatchRequested : boolean =false;
  // Pagination variables
  currentPage: number = 1;
  pageSize: number = 30;
  selectedDays : any ;
  searchText:any;

  constructor(private apiservice :ApiDataService, private router : Router){ }
  ngOnInit(){
    this.GetAllCategory();
    this.GetCourses();
    this.loader =true;
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
        course.CourseTitle.toLowerCase().includes(search) ||course.days.toLowerCase().includes(search)|| course.CourseCategory.toLowerCase().includes(search)
      );
   
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
  

  Save(title:any,time:any,description:any,request:any){
    // alert(this.selectedDays);
    if (!this.selectedFile) {
      alert('Please select an image to upload.');
      return;
    }

    if(title === '' || time === '' || description === '')
    {
      alert('Cannot Process Empty Information!');
      return;
    }

    const formData = new FormData();
    this.progress = 0; // Reset progress
    formData.append('video', this.selectedFile);
    this.loader =true;
    this.apiservice.SaveImage(formData).subscribe({
      next:(d:any)=>{
        this.progressLoader =true;
        if (d.type === HttpEventType.UploadProgress) {
            // Calculate and update the upload progress percentage
            this.progress = Math.round((100 * d.loaded) / d.total);
            console.log(`Upload progress: ${this.progress}%`);
            // Update your progress bar or any UI element accordingly
          } else if (d.type === HttpEventType.Response) {
            // File upload completed successfully
           
        let df = {
          'accesskey' : localStorage.getItem('accesskey'),
          'fullname' : localStorage.getItem("customername"),
          'title' : title,
          'description' : description,
          'category' : this.selectedSamples,
          'settime' : time,
          // 'coursefees' : fees,
          'courseurl' : d.body,
          'rewatch' : this.isRewatchRequested,
          'daysN' : this.selectedDays
        }
      
        this.progressLoader =false;
      console.log(df)
        // console.log(df);
        this.apiservice.SaveCourse(df).subscribe({
          next:(result)=>{
            this.loader =false;
            alert("Hooray! , You Have Successfully Upload a Course Content");
            this.GetCourses();
          }, error:(err)=>{
            this.loader =false;
            console.log(err);
              //alert("Error !, May Caused By Duplicate Course Title OR Video File too Large")
               // Check if the error status code is 413 (Request Entity Too Large)
              if (err.status === 413) {
                alert("Error: Request Entity Too Large. Please upload a smaller file.(MAX 200MB)");
              } else {
                alert("Error! May be caused by duplicate Course Title or other issues.");
              }
          }
        });
     }

      },
      error:(err)=>{
        alert("Failed to Upload Resources! code: " + err.statusText);
        this.loader =false;
        if (err.Status === 413) {
          alert("Error: Request Entity Too Large. Please upload a smaller file.(MAX 200MB)");
        } else {
          alert("Error! May be caused by duplicate Course Title or File too Large For Upload");
        }
      }
    });
  }

  Save2(title: any, time: any, description: any, request: any) {
    if (!this.selectedFile) {
      alert('Please select a video to upload.');
      return;
    }
  
    if (title === '' || time === '' || description === '') {
      alert('Cannot process empty information!');
      return;
    }
  
    const formData = new FormData();
    formData.append('video', this.selectedFile);
    this.loader = true;
  
    this.apiservice.SaveVideo(formData).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          // Calculate and update the upload progress percentage
          const progress = Math.round((100 * event.loaded) / event.total);
          console.log(`Upload progress: ${progress}%`);
          // Update your progress bar or any UI element accordingly
        } else if (event.type === HttpEventType.Response) {
          // File upload completed successfully
          let df = {
            'accesskey': localStorage.getItem('accesskey'),
            'fullname': localStorage.getItem('customername'),
            'title': title,
            'description': description,
            'category': this.selectedSamples,
            'settime': time,
            'courseurl': event.body, // Assuming the server returns the file URL
            'rewatch': this.isRewatchRequested,
            'daysN': this.selectedDays,
          };
  
          this.apiservice.SaveCourse(df).subscribe({
            next: (result) => {
              this.loader = false;
              alert('Hooray! You have successfully uploaded a course content.');
              this.GetCourses();
            },
            error: (err) => {
              this.loader = false;
              console.log(err);
              alert('Error! May be caused by duplicate course title or other issues.');
            },
          });
        }
      },
      error: (err) => {
        this.loader = false;
        console.error('Failed to upload resources', err);
        alert('Error uploading video. Please check the console for details.');
      },
    });
  }

  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  GetCourses(){
  this.loader=true;
  this.apiservice.GetCourse(localStorage.getItem('accesskey')).subscribe({
    next:(d)=>{
      this.loader=false;
      this.Course = d;
    } , error:(err)=>{
      console.log(err);
      this.loader = false;
    }
  });

    }
    trash(id:any){

      const confirmationMessage = "Do you want to delete this Product Permanently?";
const confirmationResult = confirm(confirmationMessage);
if(confirmationResult){
        this.loader=true;
      this.apiservice.DeleteCourse(localStorage.getItem('accesskey'),id).subscribe({
        next:(d)=>{
          this.loader=false;
          this.GetCourses();
          alert("Deleted Successfully!");
          this.loader = false;
        } , error:(err)=>{
          console.log(err);
          this.loader =false;
        }
      });
    
        }
      }
  
      edit(data:any){
        const confirmationMessage = "Please Kindly Confirm that you will like to Make Changes to this Course";
        const confirmationResult = confirm(confirmationMessage);
        if(confirmationResult){
      this.Create =false;
      this.EditId = data.id;
      this.EditTitle = data.CourseTitle;
      this.EditFees = data.courseFee;
      this.EditSetTime = data.SetTime;
        }
      
       
      }

      Update(edit1:any,edit3:any)
      {
        
        let df = {
          'accesskey' : localStorage.getItem('accesskey'),
          'settime' : edit3,
          'coursefees' : this.selectedDays,
          'courseurl' : this.EditId
        }

        this.loader =true;
        this.apiservice.UpdateCourse(df).subscribe({
          next:(d)=>{
            this.loader= false;
            this.Create = true;
            this.GetCourses();
            alert("Updated Successfully!");
          }
          , error:()=>{
            alert("Failed Operations!");
          }
        });
      }

    
}
