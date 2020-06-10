import { Component, OnInit, Input } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { replyComment } from '../../models/replyComment';
import  { FourmServiceService } from 'app/Pages/testingpagetwo/service/fourm-service.service'


@Component({
  selector: 'app-reply-comment',
  templateUrl: './reply-comment.component.html',
  styleUrls: ['./reply-comment.component.css']
})
export class ReplyCommentComponent implements OnInit {
  @Input('parentdocId') public paraentdocId: string;

user = "Dasun Lahiru"
replyComments:any;
  constructor(public forumService : FourmServiceService) { }

  ngOnInit(): void {
  this.getReply();
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

rComment : replyComment={
  parentCId : this.paraentdocId,
  owner : this.user ,
  date : new Date,
  comment : ''
}

onComment(event : replyComment){
 const rComment : replyComment={
    parentCId : this.paraentdocId,
    owner : this.user ,
    date : new Date,
    comment : event.comment
  }
  console.log(rComment)
  this.forumService.setReplyComment(rComment).subscribe(()=>{
    this.refresh();
    this.getReply();
  })
}
refresh(){
  this.rComment={
    parentCId : this.paraentdocId,
    owner : this.user ,
    date : new Date,
    comment : ''
  }
}
getReply(){
  this.forumService.getReplyComments(this.paraentdocId).subscribe((res)=>{
    this.replyComments = res;
  })
}
}
