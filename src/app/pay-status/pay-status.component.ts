import { Component } from '@angular/core';
import { ApiDataService } from '../Shared/api-data.service';

@Component({
  selector: 'app-pay-status',
  templateUrl: './pay-status.component.html',
  styleUrls: ['./pay-status.component.css']
})
export class PayStatusComponent {
  Failed: boolean =false;
  success : boolean = false;
  constructor (private apiservice :ApiDataService) {}
  ngOnInit(){
  var data = this.apiservice.getData();
  if(data ==="Success"){
  this.success =true;
  }
  else if (data === "Failed"){
    this.Failed =true;
  }
  }
  
}
