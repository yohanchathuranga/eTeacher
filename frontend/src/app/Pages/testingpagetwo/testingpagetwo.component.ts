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
 types = ["Genaral Discussions","Science","Maths","Computer Science","Object oriented Programing"];
 searchKey : string;


constructor(private forumService: FourmServiceService,
  private matDialog: MatDialog,
  private router : Router) { }

  ngOnInit(): void {
    this.getAllthreads();
  }
getAllthreads(){
  this.onSppiner = true;
    this.forumService.getAll().subscribe( res=>{
      this.child = res;
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
    const dia = this.matDialog.open(CreateThreadComponent,{
      width: '60%',
      restoreFocus: false
    });
  }

  getThreds(){
    this.onSppiner = true;
    this.forumService.getAll().subscribe((res)=>{
      this.timeAgo(res);
      this.onSppiner = !this.onSppiner;
     });
   
}
onsearchClear(){
  this.searchKey = "";
  this.getAllthreads();
}

}


