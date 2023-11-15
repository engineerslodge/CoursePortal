import { Component } from '@angular/core';
import { ApiDataService } from '../Shared/api-data.service';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css']
})
export class WaitingRoomComponent {

  data:any;
  constructor(private apiservices: ApiDataService){}
  ngOnInit(){
    this.data = this.apiservices.getData();
  }
}
