import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {FourmServiceService} from '../service/fourm-service.service';
//import { EventEmitter } from 'protractor';
//import {Forum} from '../models/forum-thread';

@Component({
  selector: 'app-create-thread',
  templateUrl: './create-thread.component.html',
  styleUrls: ['./create-thread.component.css']
})
export class CreateThreadComponent implements OnInit {

  constructor( public forumService : FourmServiceService) { }

  formControls = this.forumService.form.controls;
  public threadList: any;

  @Output() public childEvent = new EventEmitter();
  ngOnInit(): void {
    this.getThreds();    
    console.log(this.threadList)
  }

 name = "Banura Hettiarachchi";

onSubmit(){
  const emp = {
    id : null,
    title : this.formControls.title.value,
    body : this.formControls.body.value,
    timestamps: new Date(),
    views: 0,
    owner:this.name  
  }
 //console.log(emp);
  this.forumService.regForum(emp).subscribe(()=>{
    this.forumService.form.reset();
    this.getThreds();
  });
  
  this.forumService.form.reset();
}

getThreds(){
  this.forumService.getAll().subscribe((res)=>{
    this.threadList = res;
    this.childEvent.emit(this.threadList);
    //console.log(this.threadList)
  });

}
}
