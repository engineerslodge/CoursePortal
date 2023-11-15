import { Component } from '@angular/core';
import { ApiDataService } from 'src/app/Shared/api-data.service';

@Component({
  selector: 'app-pay-history',
  templateUrl: './pay-history.component.html',
  styleUrls: ['./pay-history.component.css']
})
export class PayHistoryComponent {
loader : boolean = false;
name : any;
getPay :any=[];
currentPage: number = 1;
pageSize: number = 60;
searchText: string = '';
filteredCourses: any[] = [];
constructor(private apiservices :ApiDataService){}

ngOnInit(){
this.name = localStorage.getItem("fullname");
this.Pay();
}

get totalItems(): number {
  return this.getPay.length;
}
onInputChange(){

  const search = this.searchText.toLowerCase().trim();
 if (search === '') {
    this.Pay();
    return; // Stop further processing if search text is empty
  }
    this.getPay = this.getPay.filter((course: any) =>  // Explicitly declare the type here
      course.accesskey.toLowerCase().includes(search) || course.Plan.toLowerCase().includes(search)
    );
 
}

onPageChange(page: number): void {
  this.getPay = page;
}


Pay(){
  this.loader =true;
  this.apiservices.getPay().subscribe({
    next:(d)=>{
      this.loader =false;
      this.getPay = d;
    }, error :(err)=>{
      this.loader =false; 
    }
  });
}


}
