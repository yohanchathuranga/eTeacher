import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseURL = "http://localhost:3000/forums";

  constructor(private http : HttpClient,) { }

  searchInput = new FormGroup({
    search : new FormControl('')
  })
 getAllFormTypes(){
   return this.http.get(this.baseURL + '/type');
 }

 getAllForums( user: string){
   return this.http.get(this.baseURL + '/my/search/' + user)
 }

}
