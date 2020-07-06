import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { stringify } from 'querystring';

@Component({
  selector: 'app-messaging-page',
  templateUrl: './messaging-page.component.html',
  styleUrls: ['./messaging-page.component.css']
})
export class MessagingPageComponent implements OnInit {

currentUser = localStorage.getItem("currentUser");
searchedUser = localStorage.getItem("searchedUser");
chatName : String = 'emptyChat';
chats : Observable<any[]>;


constructor(db : AngularFireDatabase) { 
    this.chats = db.list('/chats/' + this.currentUser + "/userChats/").valueChanges();
}

  ngOnInit(): void {
  }

changeTheSeacherdUser(user : string){
  localStorage.setItem("searchedUser", user);
}  

}
