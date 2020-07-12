import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http : HttpClient) { }

  getUsersAdmin(){
    return this.http.get<any>('http://localhost:3000/admin/userstoadmin')
  }

  getDeletedUsersAdmin(){
    return this.http.get<any>('http://localhost:3000/admin/deleteduserstoadmin')
  }

  setDeletedUser(user){
    return this.http.post<any>('http://localhost:3000/admin/setDelUser',user)
  }

  delAvaiUser(userId){
    return this.http.delete<any>('http://localhost:3000/admin/delAvaiUser' + '/' + userId)
  }

  setRecoverUser(user){
    return this.http.post<any>('http://localhost:3000/admin/setRecUser',user)
  }

  recoverUser(userId){
    return this.http.delete<any>('http://localhost:3000/admin/recoverUser' + '/' + userId)
  }

  removeTeacherFlag(userId){
    return this.http.put<any>('http://localhost:3000/admin/changeTeacherFlag',userId)
  }

  removeStudentFlag(userId){
    return this.http.put<any>('http://localhost:3000/admin/changeStudentFlag', userId)
  }
  
}
