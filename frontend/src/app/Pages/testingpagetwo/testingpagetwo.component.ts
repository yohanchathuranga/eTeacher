import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import {FourmServiceService } from './service/fourm-service.service';
import * as moment from 'moment';
import {MatDialog} from '@angular/material/dialog';
import { CreateThreadComponent } from './create-thread/create-thread.component';
import {Forum} from './models/forum-thread';
import { Router } from '@angular/router';





@Component({
  selector: 'app-testingpagetwo',
  templateUrl: './testingpagetwo.component.html',
  styleUrls: ['./testingpagetwo.component.css']
})
export class TestingpagetwoComponent implements OnInit {

 child : any;
 p: number = 1;
 onSppiner = true;
 types = ["Genaral Discussions","Science","Maths","Computer Science","Object oriented Programing"];
 

constructor(private forumService: FourmServiceService,
  private matDialog: MatDialog,
  private router : Router) { }

  ngOnInit(): void {
    this.forumService.getAll().subscribe( res=>{
      this.child = res;
      console.log(res)
      this.timeAgo(this.child);
      this.onSppiner = !this.onSppiner;
    });
  }

timeAgo(event){
  let list = event;
  for(let i in list){
    list[i].timeAgo= moment(event[i].timestamps).fromNow();
  } 
  this.child = list
  }

  onSelect(property){
      this.router.navigate(['/forum',property._id])
  }

  onCreate(){
    this.matDialog.open(CreateThreadComponent,{
      width: '50%'
    });
  }

  getThreds(){
    this.onSppiner = true;
    this.forumService.getAll().subscribe((res)=>{
      this.timeAgo(res);
      this.onSppiner = !this.onSppiner;
     });
   
}


}


