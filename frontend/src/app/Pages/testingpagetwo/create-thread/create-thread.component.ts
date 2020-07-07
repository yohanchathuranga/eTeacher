import { Component, OnInit, Inject } from '@angular/core';
import {FourmServiceService} from '../service/fourm-service.service';
//import { EventEmitter } from 'protractor';
import {Forum} from '../models/forum-thread';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute } from '@angular/router';
import { Types } from '../models/forumType';


@Component({
  selector: 'app-create-thread',
  templateUrl: './create-thread.component.html',
  styleUrls: ['./create-thread.component.css']
})
export class CreateThreadComponent implements OnInit {
attempted = true;
name = "Yohan Chathuranga";
forumTypes:string[];
type : string;
formControls = this.forumService.form.controls;
formControlsT = this.forumService.formType.controls;
formControlsU = this.forumService.updateForm.controls;
public threadList: any;
// count : number;  
flag = true;
image: string = '';
newForum = false;
newThread = false;
updateForum = false;
toppingList: string[] = ['Rajitha Gayashan', 'Nipuna Sarachchandra', 'Pasindu Bhashitha', 'Sasika Nawarathna', 'Vihaga Shamal', 'Tharindu Madhusanka'];
user = 'Rajitha Gayashan'
tag = ''
updateThread : any;

constructor( public forumService : FourmServiceService, 
     private matdialogRef:MatDialogRef<CreateThreadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public route : ActivatedRoute) {}

ngOnInit(): void {
    try{
      console.log(this.data)
      this.type = this.data.type;
      this.forumTypes = this.data.types,
      this.image = this.data.threadImage
      this.newForum = this.data.newForum,
      this.newThread = this.data.newThread,
      this.updateForum = this.data.updateForum,
      console.log( this.newForum,this.newThread,this.updateForum)
    }catch{
       console.log("this is not error");
    }

    if(this.type){
       this.flag = !this.flag;
     }
     this.forumService.getForumtypes();
}
 
uplodeImage(event){
  const img = (event.target as HTMLInputElement).files[0];
  const reader = new FileReader();
  reader.onload = () => {
    this.image = reader.result as string;
    // console.log(this.image)
  };
  reader.readAsDataURL(img);
  // console.log(img)
  // console.log(event)
 
}  

onSubmit(){
  if(!this.formControls._id.value){
  const emp : Forum = {
    _id : null,
    title : this.formControls.title.value,
    body : this.formControls.body.value,
    type : this.formControls.type.value,
    image : this.image,
    timestamps: new Date(),
    views: 0,
    owner:this.name,
    timeAgo:'',
    replies:0,
    votes:0
  }
  this.forumService.regForum(emp).subscribe(()=>{
    this.forumService.form.reset();
    this.getThreds();
    this.forumService.success("Submited Successfully")

  });
  this.onNoClick();
  }else{
    console.log(this.formControls._id.value)
    const updateThread = {
      title : this.formControls.title.value,
      body : this.formControls.body.value,
      image : this.image
    }
    this.forumService.updateThread(this.formControls._id.value , updateThread).subscribe(()=>{
      this.forumService.form.reset();
      this.getThreds();
      this.forumService.success("Updated Successfully")
    })
    
  }
}

newType(){
  if(!this.formControlsT._id.value){
  const type : Types = {
    _id : null,
    forumOwner : this.formControlsT.forumOwner.value,
    description : this.formControlsT.description.value,
    type : this.formControlsT.type.value,
    teachers : this.formControlsT.teachers.value,
}
// console.log(type)
  if(confirm('Are you sure to add this Forum type?')){
    this.forumService.setType(type).subscribe(res=>{
    // console.log(res)
     this.forumService.formType.reset();
     this.forumService.success("New Forum Type Successfully created!")
})
    
    this.matdialogRef.afterClosed().subscribe(result => {  
      this.forumService.formType.reset()
    })
    this.matdialogRef.close();
    }
  }
}

updateF(){
  if(this.formControlsU._id.value){
  const updatedForum = {  
    description : this.formControlsU.description.value,
    teachers : this.formControlsU.teachers.value
  }
  if(confirm('Are you sure to Update this Forum?')){
    this.forumService.updateForum(this.formControlsU._id.value, updatedForum).subscribe(res=>{
    // console.log(res)
     this.forumService.updateForm.reset();
     this.forumService.success("Forum is Successfully updated!")
})
    
    this.matdialogRef.afterClosed().subscribe(result => {  
      this.forumService.updateForm.reset()
    })
    this.matdialogRef.close();
    }
  }
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
    uploadUrl: '',
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
