import { Component, OnInit } from '@angular/core';
import {FourmServiceService} from '../service/fourm-service.service';
import {Forum} from '../models/forum-thread';

@Component({
  selector: 'app-create-thread',
  templateUrl: './create-thread.component.html',
  styleUrls: ['./create-thread.component.css']
})
export class CreateThreadComponent implements OnInit {

  constructor( public forumService : FourmServiceService) { }

  formControls = this.forumService.form.controls;
  threadList : any;
  ngOnInit(): void {
  }

onSubmit(){
  const emp = {
    id : null,
    title : this.formControls.title.value,
    body : this.formControls.body.value
  }
 console.log(emp);
  this.forumService.regForum(emp).subscribe(()=>{
    this.forumService.form.reset()
  });
  this.forumService.form.reset();
}

getThreds(){
  this.forumService.getAll().subscribe((res)=>{
    this.threadList = res
  });
}

}
