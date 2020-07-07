import { Component, OnInit } from '@angular/core';
import  { FourmServiceService } from '../service/fourm-service.service'
import { HttpClient,HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Forum } from '../models/forum-thread';
import * as moment from 'moment';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Reply} from 'app/Pages/testingpagetwo/models/comment';
import {VoteDetails} from '../models/voteDetails'


@Component({
  selector: 'app-view-thread',
  templateUrl: './view-thread.component.html',
  styleUrls: ['./view-thread.component.css']
})
export class ViewThreadComponent implements OnInit {

  constructor( public forumService : FourmServiceService,
    private route: ActivatedRoute ) { }

threadId : string;
threadOwner : string;
getThread : any;
timeArray =[];
threadBody : string;
// user = JSON.parse(localStorage.getItem('user'));
owner = "Banura Hettiarachchi";
comments : any;
open = false;
viewReply = false;
replyCount = 0; 
subReplys : any;
subReplyCount = 0; 
selectCommentId :string;
allsubReplys : any;
thread :any
threadImage : string;
voteDetails : any;
vUp = false;
vDown = false;
voteId : string;

ngOnInit(): void {
  // console.log(this.user.name)
      this.route.params.subscribe(routerParam =>{
        this.threadId = routerParam.id
         });
     this.forumService.getThread(this.threadId).subscribe(res=>{
        this.getThread = res;
        console.log(this.getThread);
        this.timeAgo(this.getThread);
        this.threadOwner = this.getThread.owner
        this.threadBody = this.getThread.body;
        this.threadImage = this.getThread.image;
        this.updateViwes(this.getThread);
        this.forumService.setViwes(this.getThread).subscribe(()=>{      
        });
        this.forumService.getsubReplyC(this.threadId).subscribe((res)=>{
          this.subReplys = res;
          this.subReplyCount = this.subReplys.length;
        })
     });
    this.getComments();
    this.setVoteDetails();
    }

timeAgo(event:any){
    event.timeAgo= moment(event.timestamps).fromNow();
                 }
                 
editorConfig: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: '150px',
  minHeight: '0',
  maxHeight: 'auto',
  width: 'auto',
  minWidth: '0',
  translate: 'yes',
  enableToolbar: true,
  showToolbar: true,
  placeholder: 'Reply',
  defaultParagraphSeparator: '',
  defaultFontName: '',
  defaultFontSize: '',
  fonts: [
    {class: 'arial', name: 'Arial'},
    {class: 'times-new-roman', name: 'Times New Roman'},
    {class: 'calibri', name: 'Calibri'},
    {class: 'comic-sans-ms', name: 'Comic Sans MS'}
  ],                
  customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ],
  sanitize: true,
  toolbarPosition: 'bottom',
  toolbarHiddenButtons: [
    [
      'redo',    
      'strikeThrough',
      'subscript',
      'superscript',
      'justifyLeft',
      'justifyCenter',
      'justifyRight',
      'justifyFull',
      'indent',
      'outdent',     
      'heading',
      'fontName'
    ],
    [      
      'textColor',
      'backgroundColor',
      'customClasses',     
      'unlink',
      'insertImage',
      'insertVideo',
      'insertHorizontalRule',
      'removeFormat'     
    ]
  ]
};                                

setVoteDetails(){
  this.forumService.getVoteDetails(this.threadId,this.owner).subscribe(res=>{
    this.voteDetails = res
    // console.log(res);
    if(this.voteDetails.length != 0){
    this.voteId = this.voteDetails[0]._id
    // console.log(this.voteId)
    }
    if(this.voteDetails.length == 0){
      this.vUp = false
      this.vDown = false
    }else if(this.voteDetails[0].voteUp){
      this.vUp = true
      this.vDown = false;
    }else if(this.voteDetails[0].voteDown){
      this.vUp = false
      this.vDown = true
    }
  });  
}

comment : Reply ={
    id : "",
    threadId : "",
    owner : this.owner,
    date : new Date,
    comment : ""
  }

relodeCmt(){
  this. comment ={
    id : "",
    threadId : "",
    owner : this.owner,
    date : new Date,
    comment : ""
  }
}
      
on(cmt : Reply){
  cmt.threadId = this.threadId,
  this.forumService.submitCmt(cmt).subscribe(()=>{
  this.getComments();
  this.relodeCmt();
  this.setReplyCount()
  });    
}

getComments(){
  this.forumService.getComments(this.threadId).subscribe(res=>{
    this.comments = res;
  });    
}

setReplyCount(){
  this.forumService.getsubReplyC(this.threadId).subscribe((res)=>{
    this.allsubReplys = res;
      this.subReplyCount = this.allsubReplys.length;
        this.forumService.getComments(this.threadId).subscribe(res=>{
        this.comments = res;
        this.replyCount = this.comments.length;
    this.forumService.getThread(this.threadId).subscribe((res)=>{
      this.thread = res;
      this.thread.replies = 0;
      this.thread.replies =  this.subReplyCount +  this.replyCount; 
      this.forumService.setReplycount(this.thread).subscribe(()=>{
        }); 
      });  
    });
  });
}


updateViwes(event: any){
  event.views = event.views + 1;
  this.getThread = event;
 }

 onChange(){
    if(this.open == false){
      this.open=true;
    }else{
        this.open=false;
      }
    }

voteUp(event: any){ 

    const voteUp : VoteDetails = {
      voteUp : true,
      voteDown : false,
      owner : this.owner
    }
    if(!this.vUp && !this.vDown){
      this.vUp = true;
      this.vDown = false  
    this.forumService.setVotDetails(this.threadId , voteUp).subscribe((res)=>{
      // this.setVoteDetails();
    });
  }else{
    this.vUp = true;
    this.vDown = false
    const newvoteUp = {
      voteUp : true,
      voteDown : false
    }
    this.forumService.updateVotedetails(this.threadId, this.voteId , newvoteUp).subscribe((res=>{
      // this.setVoteDetails();
    }))

  }
     event.votes = event.votes + 1;
    this.getThread = event;
    this.forumService.setVoteup(this.getThread).subscribe((res)=>{
      this.getThread = res;
    });
 }

voteDown(event: any){
  const voteDown : VoteDetails = {
    voteUp : false,
    voteDown : true,
    owner : this.owner
  }
  if(!this.vUp && !this.vDown){
    this.vUp = false;
    this.vDown = true;
    this.forumService.setVotDetails(this.threadId , voteDown).subscribe((res)=>{
      // this.setVoteDetails();
    });
  }else{
    this.vUp = false;
    this.vDown = true;
    const newvoteDown = {
      voteUp : false,
      voteDown : true
    }
    this.forumService.updateVotedetails(this.threadId, this.voteId , newvoteDown).subscribe((res=>{
      // this.setVoteDetails();
    }))

  }
  event.votes = event.votes - 1;
  this.getThread = event;
  this.forumService.setVotedown(this.getThread).subscribe((res)=>{  
    this.getThread =res;   
  });
}

getCommentId(ID:string){
  this.selectCommentId = ID;
}

test(){
  this.viewReply = !this.viewReply;
}

}
