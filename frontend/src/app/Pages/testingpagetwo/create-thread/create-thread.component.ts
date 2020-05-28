import { Component, OnInit } from '@angular/core';
import {FourmServiceService} from '../service/fourm-service.service'
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-create-thread',
  templateUrl: './create-thread.component.html',
  styleUrls: ['./create-thread.component.css']
})
export class CreateThreadComponent implements OnInit {

  constructor( public forumService : FourmServiceService) { }

  formControls = this.forumService.form.controls;


  ngOnInit(): void {
  }

onSubmit(){
  const emp = {
    id : null,
    title : this.formControls.title.value,
    body : this.formControls.body.value
  }
 console.log(emp);
  this.forumService.regForum(emp);
  this.forumService.form.reset();
}



}
