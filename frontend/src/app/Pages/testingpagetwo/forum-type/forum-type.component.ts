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
      })

    })
  }
timeAgo(event){
  let list = event;
  for(let i in list){
    list[i].timeAgo= moment(event[i].timestamps).fromNow();
  } 
  this.threads = list
  console.log(list)
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
  this.matDialog.open(CreateThreadComponent,{
    width: '50%',
    data: {
      type: this.type
    }
  });
} 

getThreds(type :string){
  console.log(type);
  this.onSppiner = true;
  this.forumService.getType(type).subscribe((res)=>{
    this.timeAgo(res);
    this.count(res);
    this.onSppiner =!this.onSppiner;
  })
}
 
} 

