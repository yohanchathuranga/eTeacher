import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import {FourmServiceService } from './service/fourm-service.service';
import * as moment from 'moment';
import {MatDialog} from '@angular/material/dialog';
import { CreateThreadComponent } from './create-thread/create-thread.component';
import {Forum} from './models/forum-thread';





@Component({
  selector: 'app-testingpagetwo',
  templateUrl: './testingpagetwo.component.html',
  styleUrls: ['./testingpagetwo.component.css']
})
export class TestingpagetwoComponent implements OnInit {

 child : any;
 p: number = 1;
 timeArray =[];

constructor(private forumService: FourmServiceService,
  private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.forumService.getAll().subscribe( res=>{
      this.child = res;
      this.timeAgo(this.child)
    });
  }
// getChlid(event:any){
 
//   this.child = event;
  
// }

timeAgo(event){
  let list = event;
  for(let i in list){
    list[i].timeAgo= moment(event[i].timestamps).fromNow();
  } 
  this.child = list
  }

  onCreate(){
    this.matDialog.open(CreateThreadComponent,{
      width: '50%'
    });
  }

  getThreds(){
    this.forumService.getAll().subscribe((res)=>{
      this.timeAgo(res);
     });
}


}


