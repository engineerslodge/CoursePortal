import { Component } from '@angular/core';
import { ApiDataService } from '../Shared/api-data.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-class-history',
  templateUrl: './class-history.component.html',
  styleUrls: ['./class-history.component.css']
})
export class ClassHistoryComponent {
  loader:boolean =false;
  name : any ;
  getDashboard :any =[];
  currentDateTime: string = '';
  allCategory : any =[];
  DataLength : any=[];


constructor(private apiservice :ApiDataService){}
ngOnInit(){
  this.name = localStorage.getItem("customername");
  this.GetAllCategory();
  this.Dashboard();
  interval(1000).subscribe(() => {
    this.updateCurrentDateTime();
  });
}

Dashboard(){
this.loader =true;
this.apiservice.ClassHistory(localStorage.getItem("accesskey")).subscribe({
  next:(d)=>{
    this.getDashboard =d;
    this.DataLength = d.length;
    this.loader =false;
  },
  error:(err)=>{
    console.log(err);
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
     // console.log(d);
      this.loader =false;
      this.allCategory = d;
    //  console.log(d);
    },
    error:(er)=>{
      this.loader =false;
    }
  });
}


}

