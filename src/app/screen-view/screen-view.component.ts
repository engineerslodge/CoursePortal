import { Component } from '@angular/core';
import { ApiDataService } from '../Shared/api-data.service';
import { Observable, Subject, interval } from 'rxjs';

@Component({
  selector: 'app-screen-view',
  templateUrl: './screen-view.component.html',
  styleUrls: ['./screen-view.component.css']
})
export class ScreenViewComponent {
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
  

  
  public triggerObservable: Observable<void>;  
  // Other methods and properties...  
  constructor(private apiservice:ApiDataService){
    this.triggerObservable = new Subject<void>();
  }
   
  ngOnInit(){
  //  this.makeApiCall();
    this.name = localStorage.getItem("customername");
    this.dataArray = this.apiservice.getData();
    // console.log(this.dataArray);
    this.Title = this.dataArray.CourseTitle;
    this.Description = this.dataArray.CourseDescription;
    this.Url = this.dataArray.CourseUrl;
    this.Categorys = this.dataArray.CourseCategory;
  
    interval(1000).subscribe(() => {
      this.updateCurrentDateTime();
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
}

// Stop the webcam
public stopCamera(): void {
  this.showCamera = false;
}
  
makeApiCall() {
  const prompt = "Translate the following English text to French:";
  
  this.apiservice.generateCompletion(prompt).subscribe(
    (response) => {
      console.log(response.choices[0].message.content);  // Access the response as needed
    },
    (error) => {
      console.error(error);
    }
  );
}


}
