import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http : HttpClient) { }

  getusers(): Observable<any>{
    return this.http.get<any>('http://localhost:3000/users')
  }
  user: any;
  authtoken:any;
  constructor(private http: Http) { }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/user/register', user, { headers: headers }).map(res => res.json());
  }

  loginUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/user/login', user, { headers: headers }).map(res => res.json());
  }

  storeData(token,userdata){
    localStorage.setItem("tokenId",token);
    localStorage.setItem("user",JSON.stringify(userdata));
    this.authtoken=token;
    this.user=userdata;
  }

  getProfile(){
    this.fetchToken();
    let headers = new Headers();
    headers.append('Authorization', this.authtoken);
    headers.append('Content-Type', 'application/json')
    return this.http.get("http://localhost:3000/user/profile",{ headers: headers }).map(res => res.json());
  }

  fetchToken(){
    const token = localStorage.getItem("tokenId");
    this.authtoken=token;
  }
}
