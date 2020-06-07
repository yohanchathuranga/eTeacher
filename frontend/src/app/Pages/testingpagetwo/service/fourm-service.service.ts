import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Form, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Forum} from '../models/forum-thread'
import { Observable } from 'rxjs';
import { Reply } from '../models/comment'


@Injectable({
  providedIn: 'root'
})
export class FourmServiceService {

baseURL = "http://localhost:3000/forums";
baseURL2 = "http://localhost:3000/comments"; 
  constructor(
    private http : HttpClient
  ) { }
  
form = new FormGroup({
  id : new FormControl(null),
  title : new FormControl('', Validators.required),
  body : new FormControl('', Validators.required),
  forum_type:new FormControl('')
});

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

}
