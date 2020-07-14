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

  getAllForums(){
    return this.http.get<any>('http://localhost:3000/admin/getAllForums')
  }

  getDelForums(){
    return this.http.get<any>('http://localhost:3000/admin/getDelForums')
  }

  setDeletedForum(forum){
    return this.http.post<any>('http://localhost:3000/admin/setDelForum',forum)
  }

  delAvaiForum(forumId){
    return this.http.delete<any>('http://localhost:3000/admin/delAvaiForum' + '/' + forumId)
  }

  setRecoverForum(forum){
    return this.http.post<any>('http://localhost:3000/admin/setRecForum',forum)
  }

  recoverForum(forumId){
    return this.http.delete<any>('http://localhost:3000/admin/recoverForum' + '/' + forumId)
  }

  getAllComments(){
    return this.http.get<any>('http://localhost:3000/admin/getAllComments')
  }

  getAllBookings(){
    return this.http.get<any>('http://localhost:3000/admin/getAllBookings')
  }

  getAllComplains(){
    return this.http.get<any>('http://localhost:3000/admin/getAllComplains')
  }

  setDeletedComplain(complain){
    return this.http.post<any>('http://localhost:3000/admin/setDeletedComplain',complain)
  }

  delAvaiComplain(complainId){
    return this.http.delete<any>('http://localhost:3000/admin/delAvaiComplain' + '/' + complainId)
  }

  getDelComplains(){
    return this.http.get<any>('http://localhost:3000/admin/getDelComplains')
  }

  setRecoverComplain(complain){
    return this.http.post<any>('http://localhost:3000/admin/setRecComplain',complain)
  }

  recoverComplain(complainId){
    return this.http.delete<any>('http://localhost:3000/admin/recoverComplain' + '/' + complainId)
  }
  
}
