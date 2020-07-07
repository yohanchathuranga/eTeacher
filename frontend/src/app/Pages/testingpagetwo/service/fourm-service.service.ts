import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Form, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Forum} from '../models/forum-thread'
import { Observable } from 'rxjs';
import { Reply } from '../models/comment'
import {replyComment} from '../models/replyComment'
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar';
import { Types } from '../models/forumType';
import { CheckForumTypeDirective } from '../service/check-forum-type.directive';
import { VoteDetails } from '../models/voteDetails';



@Injectable({
  providedIn: 'root'
})
export class FourmServiceService {

baseURL = "http://localhost:3000/forums";
baseURL2 = "http://localhost:3000/comments"; 
baseURL3 = "http://localhost:3000/replyComments";
baseURL4 = "http://localhost:3000/type";
existingTags : any;
types = [];
Tags = this.types;
thread : any;
forumDetails : any;


  constructor(
    private http : HttpClient,
    public snackBar: MatSnackBar
  ) { }
  
form = new FormGroup({
  _id : new FormControl(null),
  title : new FormControl('', Validators.required),
  body : new FormControl('', Validators.required),
  type:new FormControl('', Validators.required)
});

formType = new FormGroup({
  _id : new FormControl(null),
  forumOwner : new FormControl('', Validators.required),
  type : new FormControl('', [Validators.required, CheckForumTypeDirective.checkDblicate(this.Tags)]),
  description : new FormControl('',Validators.required),
  teachers : new FormControl([], Validators.required)
});

updateForm = new FormGroup({
  _id : new FormControl(null),
  description : new FormControl('',Validators.required),
  teachers : new FormControl([], Validators.required)
});


editThread(threadId : string){

  this.getThread(threadId).subscribe(res=>{
    this.thread = res;
    // console.log(this.thread.image.data)
    this.form.patchValue({
      _id : this.thread._id,
      title :this.thread.title,
      body : this.thread.body,
      type:this.thread.type
    })
  })
}
editForum(type : string){
  this.getForumTypeDetails(type).subscribe((res)=>{
    this.forumDetails = res
    this.updateForm.patchValue({
      _id : this.forumDetails[0]._id,
      description : this.forumDetails[0].description,
      teachers : this.forumDetails[0].teachers
    });
  })
}

getForumtypes(){
  this.getallForumType().subscribe(res=>{
    this.existingTags = res
    // console.log(this.existingTags.length)
     for(let i in this.existingTags){
          this.types[i] = this.existingTags[i].type
          // console.log(this.Tags[i])
     }

    // console.log(this.Tags)
  })
}

success(msg : string){
  // this.config['panelClass'] = ['notification','success']
  this.snackBar.open(msg, '',{
    duration: 3000,
    horizontalPosition: "left",
    verticalPosition: "bottom",  
  panelClass: ['blue-snackbar']})
}

config : MatSnackBarConfig={
  duration: 3000,
  horizontalPosition: "left",
  verticalPosition: "bottom"

}

regForum(emp:Forum){
  return this.http.post(this.baseURL,emp);
}

getAll(){
  return this.http.get<Forum>(this.baseURL)
}
getThread(id : string){
  return this.http.get(this.baseURL + '/' + id);
}

deleteThread(id :string){
  return this.http.delete(this.baseURL + '/' + id)
}

submitCmt(cmt:Reply){
  return this.http.post(this.baseURL2,cmt);
}

getComments(id){
  return this.http.get(this.baseURL2 + '/'+ id);
}

setViwes(emp: any){
  return this.http.put(this.baseURL + '/' + emp._id, emp);
}

setVoteup(emp:any){
  return this.http.put(this.baseURL + '/' + emp._id, emp);
}

setVotedown(emp:any){
  return this.http.put(this.baseURL + '/' + emp._id, emp);
}

setReplyComment(replyComment : replyComment){
  return this.http.post(this.baseURL3, replyComment)
}

getReplyComments(id){
  return this.http.get(this.baseURL3 + '/' + id);
}
getType(type:string){
  return this.http.get(this.baseURL4 + '/' + type)
}
setReplycount(emp: any){
  return this.http.put(this.baseURL + '/' + emp._id, emp);
}

getsubReplyC(id :string){
  return this.http.get(this.baseURL3 + '/'+ 'all' + '/' + id)
}
setType(type : Types){
  return this.http.post(this.baseURL+'/type',type);
}
getallForumType(){
  return this.http.get(this.baseURL + '/type');
}
getVoteDetails(id: string,user : string){
  return this.http.get(this.baseURL + '/'+ id + '/' + user) 
}
updateVotedetails(id : string , voteId : string , voteUpdate : any){
  return this.http.put(this.baseURL + '/' + id + '/vote/' + voteId, voteUpdate);
}
setVotDetails(id: string , vote : VoteDetails){
  return this.http.post(this.baseURL + '/' + id, vote);
}
updateThread(id : string, thread:any){
  return this.http.put(this.baseURL4 + '/type/' + id , thread);
}
// get forum details
getForumTypeDetails(type : string){
  return this.http.get(this.baseURL4 + '/forum/' + type);
}
updateForum(id : string, updateForum : any){
  return this.http.put(this.baseURL4 + '/update/' + id,updateForum);
}

deleteForumType(type :string){
  return this.http.delete(this.baseURL4 + '/' + type)
}
deleteThreads(type : string){
  return this.http.delete(this.baseURL + '/type/' + type)
}
}
