import { Component, OnInit, Input } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { replyComment } from '../../models/replyComment';
import  { FourmServiceService } from 'app/Pages/testingpagetwo/service/fourm-service.service';
import {Forum} from 'app/Pages/testingpagetwo/models/forum-thread';


@Component({
  selector: 'app-reply-comment',
  templateUrl: './reply-comment.component.html',
  styleUrls: ['./reply-comment.component.css']
})
export class ReplyCommentComponent implements OnInit {
  @Input('Data') public commentId : string;
  @Input('Data2') public threadId : string;
  @Input('Data3') public commentCount : number;


user = "Dasun Lahiru"
replyComments:any;
thread : any
replycount = 0;
fala :any;
allsubReplys : any;
subReplyCount =0;
comments : any;
replyCount = 0;
replies : any; 

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
  parentCId : this.commentId,
  threadId : this.threadId,
  owner : this.user ,
  date : new Date,
  comment : ''
}

onComment(event : replyComment){
 const rComment : replyComment={
    parentCId : this.commentId,
    threadId : this.threadId,
    owner : this.user ,
    date : new Date,
    comment : event.comment
  }
  // console.log(rComment)
  this.forumService.setReplyComment(rComment).subscribe(()=>{
    this.refresh();
    this.getReply();
    this.getAllSubreplys();
    // this.getAllSubreplys()
  })
}
refresh(){
  this.rComment={
    parentCId : this.commentId,
    threadId : this.threadId,
    owner : this.user ,
    date : new Date,
    comment : ''
  }
}
getReply(){
  this.forumService.getReplyComments(this.commentId).subscribe((res)=>{
    this.replyComments = res;
    // console.log(this.replyComments);
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
}
