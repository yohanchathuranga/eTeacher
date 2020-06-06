import { Component, OnInit } from '@angular/core';
import  { FourmServiceService } from '../service/fourm-service.service'
import { HttpClient,HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Forum } from '../models/forum-thread';
import * as moment from 'moment';


@Component({
  selector: 'app-view-thread',
  templateUrl: './view-thread.component.html',
  styleUrls: ['./view-thread.component.css']
})
export class ViewThreadComponent implements OnInit {

  constructor( public forumService : FourmServiceService,
    private route: ActivatedRoute ) { }

  threadId : string;
  getThread : any;
  timeArray =[];
  threadBody : string;
  
  ngOnInit(): void {
      this.route.params.subscribe(routerParam =>{
        this.threadId = routerParam.id
         });
     this.forumService.getThread(this.threadId).subscribe(res=>{
        this.getThread = res;
        this.timeAgo(this.getThread);
        this.threadBody = this.getThread.body;
        console.log(this.threadBody);
     })
    }

    timeAgo(event:any){
       event.timeAgo= moment(event.timestamps).fromNow();
      }
}
