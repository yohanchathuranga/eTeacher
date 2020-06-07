import { Component, OnInit } from '@angular/core';
import  { FourmServiceService } from '../service/fourm-service.service'
import { HttpClient,HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Forum } from '../models/forum-thread';
import * as moment from 'moment';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Reply} from 'app/Pages/testingpagetwo/models/comment'


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
  owner = "Yohan Chathuranga";
  comments : any;
  
  ngOnInit(): void {
      this.route.params.subscribe(routerParam =>{
        this.threadId = routerParam.id
         });
     this.forumService.getThread(this.threadId).subscribe(res=>{
        this.getThread = res;
        this.timeAgo(this.getThread);
        this.threadBody = this.getThread.body;
        console.log(this.threadBody);
     });

    this.getComments();

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
        });
      }
      getComments(){
        this.forumService.getComments(this.threadId).subscribe(res=>{
          this.comments = res;
          console.log(this.comments);
       });
      }
      

}
