import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import {FourmServiceService} from '../service/fourm-service.service';
//import { EventEmitter } from 'protractor';
import {Forum} from '../models/forum-thread';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-create-thread',
  templateUrl: './create-thread.component.html',
  styleUrls: ['./create-thread.component.css']
})
export class CreateThreadComponent implements OnInit {

  constructor( public forumService : FourmServiceService, 
     private matdialogRef:MatDialogRef<CreateThreadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Forum) { }

  formControls = this.forumService.form.controls;
  public threadList: any;

  @Output() public childEvent = new EventEmitter();
  ngOnInit(): void {
    // this.getThreds();    
    // console.log(this.threadList)
  }

 name = "Banura Hettiarachchi";

onSubmit(){
  const emp : Forum = {
    id : null,
    title : this.formControls.title.value,
    body : this.formControls.body.value,
    timestamps: new Date(),
    views: 0,
    owner:this.name,
    timeAgo:''  
  }
 //console.log(emp);
  this.forumService.regForum(emp).subscribe(()=>{
    this.forumService.form.reset();
   // this.getThreds();
  });
  this.onNoClick();
  
}

onNoClick(): void {
  this.forumService.form.reset();
  this.matdialogRef.close();
}


getThreds(){
  this.forumService.getAll().subscribe((res)=>{
    this.threadList = res;
    this.childEvent.emit(this.threadList);
    //console.log(this.threadList)
  });

}
}
