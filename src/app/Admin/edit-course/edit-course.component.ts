import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiDataService } from 'src/app/Shared/api-data.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent {
loader : boolean = false;
selectedSamples :any;
Category : any = [];
name : any ="String attached";
public triggerObservable: Observable<void>;

// Other methods and properties...

constructor(private apiservice:ApiDataService){
  this.triggerObservable = new Subject<void>();
}
ngOnInit(){
  this.name = localStorage.getItem("customername");
}


public showCamera = false;

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

}

