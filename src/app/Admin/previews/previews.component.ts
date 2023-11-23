import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, interval } from 'rxjs';
import { ApiDataService } from 'src/app/Shared/api-data.service';

@Component({
  selector: 'app-previews',
  templateUrl: './previews.component.html',
  styleUrls: ['./previews.component.css']
})
export class PreviewsComponent {
  loader:boolean =false;
  name : any ;
  getDashboard :any =[];
  currentDateTime: string = '';
  allCategory : any =[];
  dataArray : any=[];

  Title :any;
  Description:any;
  Url : any;
  Categorys :any;
  

  dataLenght :any=[];
  
  public triggerObservable: Observable<void>;  
  // Other methods and properties...  
  constructor(private apiservice:ApiDataService, private toastr : ToastrService, private router : Router){
    this.triggerObservable = new Subject<void>();
  }
   
  ngOnInit(){
// this.loader =true;
      this.GetAllMembers();
    this.name = localStorage.getItem("customername");
    this.dataArray = this.apiservice.getData();
    // console.log(this.dataArray);
    // if (this.dataArray && this.dataArray.length > 0) {      // dataArray is an array and has data
      this.Title = this.dataArray.CourseTitle;
    this.Description = this.dataArray.CourseDescription;
    this.Url = this.dataArray.CourseUrl;
    this.Categorys = this.dataArray.CourseCategory;
  
    interval(1000).subscribe(() => {
      this.updateCurrentDateTime();
    });
  // }
  // else 
  // {
  //   this.toastr.error("Invalid Session Access");
  //   this.router.navigate(['/dashboard']);
  // }
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

  

public showCamera = true;

// Triggered when the webcam is started
public handleStart(event: any): void {
  console.log('Webcam started');
}

// Triggered when a picture is taken
public handleImage(webcamImage: any): void {
  console.log('Received webcam image', webcamImage);
}

// Triggered when the webcam is stopped
public handleStop(event: any): void {
  console.log('Webcam stopped');
}

// Triggered when an error occurs
public handleError(error: any): void {
  console.error('Error accessing webcam', error);
}

// Start the webcam
public startCamera(): void {
  this.showCamera = true;
  this.toastr.success("Camera Mode Has been Activated");
}

// Stop the webcam
public stopCamera(): void {
  this.showCamera = false;
  this.toastr.error("Camera Mode Has been Deactivated");
}
  reply(data:any){
    this.toastr.error(data);
  }
  GetAllMembers(){
    this.loader=true;
    this.apiservice.AdminGetCustomer(localStorage.getItem("accesskey")).subscribe({
      next:(d)=>{
        this.dataLenght = d;
        console.log(d);
        this.loader =false;
      },error:(error)=>{
        console.log(error);
        this.loader =false;
            }
    });
  }
Users(){
  this.toastr.info(this.dataLenght.length +" Members Enrolled For this Session");
}
makeApiCall(prompt:any) {
 // const prompt = "Translate the following English text to French:";
  this.loader =true;
  this.apiservice.generateCompletion(prompt).subscribe(
    (response) => {
      this.loader = true;
    // console.log(response.choices[0].message.content);  // Access the response as needed
      var responseText = response.choices[0].message.content
      var formattedResponse = this.formatWithHtmlTags(responseText);
      this.loader =true;
      let info ={
        "accesskey" : localStorage.getItem("accesskey"),
        "email" : localStorage.getItem("email"),
        "topic" : this.Title,
        "message" : formattedResponse
      }
        this.apiservice.EndSession(info).subscribe({
          next:(reply)=>{
            this.loader =false;
            this.toastr.success("Thank you !, Session Ended!");
            this.router.navigate(['/adminViews']);
            console.log(reply);
          }, error:(err)=>{
            this.loader =false;
          }
        });
    },
    (error) => {
      console.error(error);
      this.loader =false;
    }
  );
}

 formatWithHtmlTags(text: string): string {
  // Split the text into paragraphs based on line breaks
  const paragraphs = text.split('\n');

  // Process each paragraph
  const formattedParagraphs = paragraphs.map((paragraph) => {
    // Split the paragraph into list items if it contains '-'
    if (paragraph.includes('-')) {
      const listItems = paragraph.split('-').map(item => item.trim()).filter(Boolean);

      if (listItems.length > 1) {
        // Create an unordered list (ul) and list items (li)
        const listItemsHtml = listItems.map(item => `<li>${item}</li>`).join('');
        return `<ul>${listItemsHtml}</ul>`;
      }
    }

    // If no list items, treat it as a regular paragraph
    return `<p>${paragraph}</p>`;
  });

  // Join the formatted paragraphs with line breaks
  return formattedParagraphs.join('\n');
}

Session(data:any){
  
  if(data === ""){
    this.toastr.error("Please Provide a Feedback !");
  }
  else{
    
      this.makeApiCall("I need a Personalized Message, Analyze this Feedback and Provide Accurate Response to Help Client: "+ data);
      this.toastr.success("Please Wait While We Wrap up the Session, You will Be Redirected Automatically ");
     // this.loader = false;
  }
}

  
}

