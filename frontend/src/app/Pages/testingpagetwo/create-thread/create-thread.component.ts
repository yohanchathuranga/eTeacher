import { Component, OnInit, Inject } from '@angular/core';
import {FourmServiceService} from '../service/fourm-service.service';
//import { EventEmitter } from 'protractor';
import {Forum} from '../models/forum-thread';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-thread',
  templateUrl: './create-thread.component.html',
  styleUrls: ['./create-thread.component.css']
})
export class CreateThreadComponent implements OnInit {
attempted = true;
name = "Banura Hettiarachchi";
forumTypes=["Genaral Discussion", "Science", "Maths", "Computer Science", "Object oriented Programing"];
type : string;
formControls = this.forumService.form.controls;
public threadList: any;
// count : number;  
flag = true;

constructor( public forumService : FourmServiceService, 
     private matdialogRef:MatDialogRef<CreateThreadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Forum,
    public route : ActivatedRoute) {}

ngOnInit(): void {
  // try{
    this.type = this.data.type;
    // }catch{
    //   console.log("this is not error");
    // }

     console.log(this.type);
     if(this.type){
       this.flag = !this.flag;
     }
    // this.onCheck(this.type);
    // console.log(this.flag);

  }

onSubmit(){
  const emp : Forum = {
    id : null,
    title : this.formControls.title.value,
    body : this.formControls.body.value,
    type : this.formControls.type.value,
    timestamps: new Date(),
    views: 0,
    owner:this.name,
    timeAgo:'',
    replies:0,
    votes:0
  }
 //console.log(emp);
  this.forumService.regForum(emp).subscribe(()=>{
    this.forumService.form.reset();
    this.getThreds();
    this.forumService.success("Submited Successfully")

  });
  this.onNoClick();
}

onNoClick(): void {
  this.forumService.form.reset();
  this.matdialogRef.close();
}


getThreds(){
  this.forumService.getAll().subscribe((res)=>{
    this.threadList = res;
    // this.childEvent.emit(this.threadList);
    //console.log(this.threadList)
  });
}

onCheck(type : string){
  if(!type){
    return;
  }
  let count = 0 ;
  for(let i in this.forumTypes){
    // console.log(i)
        if(this.forumTypes[i] != type){
          // console.log(this.forumTypes[i])
          continue
        }
        else{
          count = count + 1;
          // console.log(count)
        }        
  }
  // console.log(count)
  if(count){
    this.flag = false;
    // console.log(this.flag);
  } 
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
    placeholder: 'providing suppoting details or context...',
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

}
