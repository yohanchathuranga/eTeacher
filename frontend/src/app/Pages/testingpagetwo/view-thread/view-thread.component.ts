import { Component, OnInit } from '@angular/core';
import  { FourmServiceService } from '../service/fourm-service.service'
import { HttpClient,HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Forum } from '../models/forum-thread';
import * as moment from 'moment';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Reply} from 'app/Pages/testingpagetwo/models/comment';
import {VoteDetails} from '../models/voteDetails';
import {MatDialog} from '@angular/material/dialog';
import { CreateThreadComponent } from '../create-thread/create-thread.component';


@Component({
  selector: 'app-view-thread',
  templateUrl: './view-thread.component.html',
  styleUrls: ['./view-thread.component.css']
})
export class ViewThreadComponent implements OnInit {

  constructor( public forumService : FourmServiceService,
    private route: ActivatedRoute,
    private router : Router,
    private matDialog: MatDialog  ) { }

threadId : string;
threadOwner : string;
getThread : any;
timeArray =[];
threadBody : string;
// user = JSON.parse(localStorage.getItem('user'));
user = JSON.parse(localStorage.getItem('user'));
comments : any;
commentsLength : any
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
status = false;
update = false;
newForum = false;
newThread = false;
threadUpdate = false;

ngOnInit(): void {
  // console.log(this.user.name)
      this.route.params.subscribe(routerParam =>{
        this.threadId = routerParam.id
         });
    this.getThreadDetails(this.threadId);
    this.getComments();
    this.setVoteDetails();
    }
getThreadDetails(threadId : string){
  this.forumService.getThread(threadId).subscribe(res=>{
    this.getThread = res;
    console.log(this.getThread);
    this.timeAgo(this.getThread);
    this.threadOwner = this.getThread.owner._id
    this.threadBody = this.getThread.body;
    this.threadImage = this.getThread.image;
    this.status = this.getThread.status
    this.updateViwes(this.getThread);
    this.forumService.setViwes(this.getThread).subscribe(()=>{      
    });
    this.forumService.getsubReplyC(threadId).subscribe((res)=>{
      this.subReplys = res;
      this.subReplyCount = this.subReplys.length;
    })
 });
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
  this.forumService.getVoteDetails(this.threadId,this.user.name).subscribe(res=>{
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
    _id : "",
    threadId : "",
    owner : this.user.name,
    date : new Date,
    body : ""
  }

relodeCmt(){
  this. comment ={
    _id : "",
    threadId : "",
    owner : this.user.name,
    date : new Date,
    body : ""
  }
  this.open = false;
}
    
on(cmt : Reply){
  console.log(cmt)
  if(!cmt._id){
  cmt.threadId = this.threadId,
  this.forumService.submitCmt(cmt).subscribe(()=>{
  this.getComments();
  this.relodeCmt();
  this.setReplyCount()
  this.forumService.success('Comment create Successfully')
  });
  }
  else{
    const comment = {
      newComment : cmt.body
    }
    this.forumService.editComment(cmt._id, comment).subscribe(()=>{
      this.getComments();
      this.relodeCmt();
      this.forumService.success('Comment updated Successfully')
      this.update = false;
      this.open = false;
    })
  }    
}

editComment(cmt : any){
  this.update = true
  this.open = true
  this.comment = {
    _id : cmt._id,
    threadId : cmt.threadId,
    owner : cmt.owner,
    date : cmt.date,
    body : cmt.comment
  }
}

cancelUpdate(){
  this. comment ={
    _id : "",
    threadId : "",
    owner : this.user.name,
    date : new Date,
    body : ""
  }
  this.open = false;
  this.update = false;
}

getComments(){
  this.forumService.getComments(this.threadId).subscribe(res=>{
   
    for(let i in res){
      res[i].date = moment(res[i].date).fromNow();
        }
    this.comments = res;
    console.log(res)
  });    
}

setReplyCount(){
  this.forumService.getsubReplyC(this.threadId).subscribe((res)=>{
    this.allsubReplys = res;
      this.subReplyCount = this.allsubReplys.length;
        this.forumService.getComments(this.threadId).subscribe(res=>{
        this.commentsLength = res;
        this.replyCount = this.commentsLength.length;
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
      owner : this.user.name
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
      // console.log(res);
    });
 }

voteDown(event: any){
  const voteDown : VoteDetails = {
    voteUp : false,
    voteDown : true,
    owner : this.user.name
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

changeStatus(){
  const updateStatus = {
    status : !this.getThread.status
  }
  this.forumService.changeStatus(updateStatus, this.threadId).subscribe(()=>{  
    this.getThreadDetails(this.threadId);
  });
}

deleteComment(commentId : string){
  if(confirm("Are you sure to delete this Comment?")){
  this.forumService.deleteComment(commentId).subscribe(()=>{
    this.forumService.deleteSubReply(commentId).subscribe(()=>{
      this.forumService.success('Comment deleted Successfully')
      this.getComments();
      this.setReplyCount();
    })
  })
}
}

edit(threadId : string){
  this.threadUpdate = true;
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
    this.forumService.form.reset()
  //  this.getThreadDetails(this.threadId)
  })
});

}

deleteThread(id : string){
  if(confirm('Are you sure to delete this thread?')){
  this.forumService.deleteThread(id).subscribe(()=>{
    this.forumService.success("Thread deleted Successfully");
    this.router.navigate(['/' + this.getThread.type])
  })}
}

refreshThread(threadId : string){
  this.getThreadDetails(threadId);
  this.threadUpdate = false
}






}
