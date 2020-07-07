import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FourmServiceService } from '../service/fourm-service.service';
import * as moment from 'moment';
import { CreateThreadComponent } from '../create-thread/create-thread.component';
import {MatDialog} from '@angular/material/dialog';




@Component({
  selector: 'app-forum-type',
  templateUrl: './forum-type.component.html',
  styleUrls: ['./forum-type.component.css']
})
export class ForumTypeComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    public forumService : FourmServiceService,
    private router : Router, private matDialog: MatDialog ) { }
type : string;
threads : any;
p: number = 1;
flag = true;
onSppiner = true;
searchKey : string;
newForum = false;
newThread = false;
updateForum = false;
user = "Yohan Chathuranga";
thread : any;
threadImg : string;
forumDetails : any;
teachers : string[]
forumOwner :string;

  ngOnInit(): void {
    this.route.params.subscribe(routerParam=>{
      this.type = routerParam.type
      //  console.log(this.type)
      this.forumService.getType(this.type).subscribe((res)=>{
        this.threads = res;
        this.onSppiner = !this.onSppiner;
        this.count(this.threads);
        // console.log(res)
        this.timeAgo(this.threads);
      });
      this.forumService.getForumTypeDetails(this.type).subscribe((res)=>{
        this.forumDetails = res;
        console.log(res)
        this.teachers = this.forumDetails[0].teachers;
        this.forumOwner = this.forumDetails[0].forumOwner;
      })

    })
  }
timeAgo(event){
  let list = event;
  for(let i in list){
    list[i].timeAgo= moment(event[i].timestamps).fromNow();
  } 
  this.threads = list
  // console.log(list)
  }
onSelect(property){
    this.router.navigate(['/' + property.type,property._id])
} 
count(event){
  let len = event.length;
  //  console.log(len);
  if(len == 0){
    this.flag = false;
    }
  else{
    this.flag = true;
    }  
}
onCreate(){
  this.newThread = true;
  this.newForum = false;
  let matdialogRef = this.matDialog.open(CreateThreadComponent,{
    width: '50%',
    data: {
      type: this.type,
      newThread: this.newThread,
      newForum: this.newForum
    }
  });
  matdialogRef.afterClosed().subscribe(result => {  
    this.forumService.form.reset()})
  
} 

getThreds(type :string){
  // console.log(type);
  this.onSppiner = true;
  this.forumService.getType(type).subscribe((res)=>{
    this.timeAgo(res);
    this.count(res);
    this.onSppiner =!this.onSppiner;
  })
}
deleteThread(id : string){
  // console.log(id)
  this.forumService.deleteThread(id).subscribe(()=>{
    this.getThreds(this.type);
    this.forumService.success("Thread deleted Successfully")
  })
}
edit(threadId: string){
  // this.abc.editThread(threadId)
  this.forumService.editThread(threadId);
  this.forumService.getThread(threadId).subscribe(res=>{
    this.thread = res;
  this.newThread = true;
  this.newForum = false;
   let matdialogRef = this.matDialog.open(CreateThreadComponent,{
    width: '60%',
    restoreFocus: false,
    data: {
      type : this.thread.type,
      threadImage :this.thread.image,
      newForum: this.newForum,
      newThread:this.newThread
    }
  });
  matdialogRef.afterClosed().subscribe(result => {  
    this.forumService.form.reset()})
});
}
editForum(forumtype : string){
  this.forumService.editForum(forumtype);
  this.newThread = false;
  this.newForum = false;
  this.updateForum = true;
  let matdialogRef = this.matDialog.open(CreateThreadComponent,{
    width: '60%',
    restoreFocus: false,
    data: {
      type : forumtype,
      newForum: this.newForum,
      newThread:this.newThread,
      updateForum: this.updateForum
    }
  });
  matdialogRef.afterClosed().subscribe(result => {  
    this.forumService.formType.reset()})
  }
  deleteForum(type : string){
    if(confirm('Are you really want to delete this Forum?')){
      this.forumService.deleteForumType(type).subscribe(()=>{
        this.forumService.deleteThreads(type).subscribe(()=>{
          this.forumService.success("Successfully deleted Forum");
          this.router.navigate(['/' + 'forum']);
        })
      });
 
     
     
    }
  }
 
} 

