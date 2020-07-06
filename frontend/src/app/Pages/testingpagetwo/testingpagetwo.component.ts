import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import {FourmServiceService } from './service/fourm-service.service';
import * as moment from 'moment';
import {MatDialog} from '@angular/material/dialog';
import { CreateThreadComponent } from './create-thread/create-thread.component';
import {Forum} from './models/forum-thread';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'






@Component({
  selector: 'app-testingpagetwo',
  templateUrl: './testingpagetwo.component.html',
  styleUrls: ['./testingpagetwo.component.css']
})
export class TestingpagetwoComponent implements OnInit {

 child : any;
 p: number = 1;
 onSppiner = true;
 types = [];
 searchKey : string;
 flag = true;
 user = "teacher";
 newForum = false;
 newThread = false;
 allForumTypes : any;


constructor(private forumService: FourmServiceService,
  private matDialog: MatDialog,
  private router : Router) { }

  ngOnInit(): void {
    this.getAllthreads();
    this.forumService.getallForumType().subscribe(res=>{
      this.allForumTypes = res
      console.log(this.allForumTypes)
      for(let i in this.allForumTypes){
        console.log(this.allForumTypes[i])
        this.types[i] = this.allForumTypes[i].type
      }
    })
  }
count(event){
    let len = event.length;
      console.log(len);
    if(len == 0){
      this.flag = false;
      }
    else{
      this.flag = true;
      }  
  }  
getAllthreads(){
  this.onSppiner = true;
    this.forumService.getAll().subscribe( res=>{
      this.child = res;
      this.count(this.child);
      this.timeAgo(this.child);
      this.onSppiner = !this.onSppiner;
      console.log(this.child)
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
    this.newThread = true;
    this.newForum = false;
    let matdialogRef = this.matDialog.open(CreateThreadComponent,{
      width: '60%',
      restoreFocus: false,
      data: {
        newForum: this.newForum,
        newThread:this.newThread,
        types : this.types
      }
    });
    matdialogRef.afterClosed().subscribe(result => {  
      this.forumService.form.reset()})
  }

  getThreds(){
    this.onSppiner = true;
    this.forumService.getAll().subscribe((res)=>{
      this.timeAgo(res);
      this.count(res);
      this.onSppiner = !this.onSppiner;
     });
   
}
onsearchClear(){
  this.searchKey = "";
  this.getAllthreads();
}

onCreateForum(){
  this.newForum = true
  this.newThread = false
  let matdialogRef = this.matDialog.open(CreateThreadComponent,{
    width: '55%',
    // restoreFocus: false,
    data: {
      newForum: this.newForum,
      newThread:this.newThread
    }
  });
  matdialogRef.afterClosed().subscribe(result => {  
    this.forumService.formType.reset()})
}
}


