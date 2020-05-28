import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Form } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FourmServiceService {

baseURL = "http://localhost:3200/forum"; 
  constructor(
    private http : HttpClient
  ) { }
form:FormGroup = new FormGroup({
  id : new FormControl(null),
  title : new FormControl(''),
  body : new FormControl('')

});

regForum(emp){
  return this.http.post(this.baseURL,emp);
}


}
