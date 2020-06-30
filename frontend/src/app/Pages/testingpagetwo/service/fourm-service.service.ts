import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Form, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Forum} from '../models/forum-thread'
import { Observable } from 'rxjs';
import { Reply } from '../models/comment'
import {replyComment} from '../models/replyComment'
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar';
import { Types } from '../models/forumType'


@Injectable({
  providedIn: 'root'
})
export class FourmServiceService {

baseURL = "http://localhost:3000/forums";
baseURL2 = "http://localhost:3000/comments"; 
baseURL3 = "http://localhost:3000/replyComments";
baseURL4 = "http://localhost:3000/type";

  constructor(
    private http : HttpClient,
    public snackBar: MatSnackBar
  ) { }
  
form = new FormGroup({
  id : new FormControl(null),
  title : new FormControl('', Validators.required),
  body : new FormControl('', Validators.required),
  image: new FormControl(''),
  type:new FormControl('', Validators.required)
});

formType = new FormGroup({
  type : new FormControl('', Validators.required),
  teachers : new FormControl([], Validators.required)
});

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
getThread(id){
  return this.http.get(this.baseURL + '/' + id);
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
  return this.http.post(this.baseURL+'/type',type)
}

}
