import { Component, OnInit, Input } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { replyComment } from '../../models/replyComment';
import  { FourmServiceService } from 'app/Pages/testingpagetwo/service/fourm-service.service';
import {Forum} from 'app/Pages/testingpagetwo/models/forum-thread';
import * as moment from 'moment';


@Component({
  selector: 'app-reply-comment',
  templateUrl: './reply-comment.component.html',
  styleUrls: ['./reply-comment.component.css']
})
export class ReplyCommentComponent implements OnInit {
  @Input('Data') public commentId : string;
  @Input('Data2') public threadId : string;
  @Input('Data3') public commentCount : number;
  @Input('Data4') public status : boolean;


user = JSON.parse(localStorage.getItem('user'));
replyComments:any;
thread : any
replycount = 0;
fala :any;
allsubReplys : any;
subReplyCount =0;
comments : any;
replyCount = 0;
replies : any;
length : number; 
update = false;

  constructor(public forumService : FourmServiceService) { }

  ngOnInit(): void {
    // console.log(this.commentId)
    // console.log(this.threadId)
    this.getReply();
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '100px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: false,
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

rComment : replyComment={
  _id : "",
  parentCId : this.commentId,
  threadId : this.threadId,
  owner : this.user.name ,
  date : new Date,
  comment : ''
}

refresh(){
  this.rComment={
    _id : "",
    parentCId : this.commentId,
    threadId : this.threadId,
    owner : this.user.name,
    date : new Date,
    comment : ''
  }
}

onComment(event : replyComment){
  if(!event._id){
 const rComment : replyComment={
   _id : "",
    parentCId : this.commentId,
    threadId : this.threadId,
    owner : this.user.name ,
    date : new Date,
    comment : event.comment
  }
  // console.log(rComment)
  this.forumService.setReplyComment(rComment).subscribe(()=>{
    this.rComment.comment=''
    this.getReply();
    this.getAllSubreplys();
  })
}else{
  const updateReply = {
    reply : event.comment
  }
  this.forumService.editReply(event._id,updateReply).subscribe(()=>{
    this.refresh()
    this.update = false;
    this.getReply();
  })
 }
}

cancelEdit(){
  this.refresh();
  this.update = false;
}

getReply(){
  this.forumService.getReplyComments(this.commentId).subscribe((res)=>{
    for(let i in res){
      res[i].date = moment(res[i].date).fromNow();
    }
    this.replyComments = res;
    this.length = this.replyComments.length;
  });
  }

getAllSubreplys(){
    // get all replies  
    this.forumService.getsubReplyC(this.threadId).subscribe((res)=>{
      this.allsubReplys = res;
      this.subReplyCount = this.allsubReplys.length;
      // console.log(this.subReplyCount) 
      this.forumService.getComments(this.threadId).subscribe(res=>{
        this.comments = res;
        this.replyCount = this.comments.length;
      // console.log(this.replyCount)
      this.forumService.getThread(this.threadId).subscribe((res)=>{
        this.thread = res;
        // console.log('initial value :',this.thread.replies)
        this.thread.replies = 0;
        this.thread.replies =  this.subReplyCount +  this.replyCount; 
        // console.log(this.thread.replies);
        this.forumService.setReplycount(this.thread).subscribe(()=>{
          }); 
        });  
      });
    });
  }

editComment(comment : any){
  this.update = true;
  this.rComment = {
    _id : comment._id,
    parentCId : comment.parentCId,
    threadId : comment.threadId,
    owner : comment.owner ,
    date : comment.date,
    comment : comment.comment
  }
}

deleteComment(commentId : string){
    if(confirm("Are you sure to delete this reply?")){
      this.forumService.deleteReply(commentId).subscribe(()=>{
        this.forumService.success("Reply is deleted Successfully");
        this.getReply();
        this.getAllSubreplys();
      })
    }
}  
}
