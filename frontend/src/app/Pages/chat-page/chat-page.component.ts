import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {

  chat : Observable<any[]>;
  currentUser = localStorage.getItem("currentUser");
  searchedUser = localStorage.getItem("searchedUser");
  newMessage : String;
  chatName : String = this.currentUser + " To " + this.searchedUser;
  existChatName : Observable<any>;
  currUser : Observable<any>;
  flag : boolean = false;

  constructor(private user : UserService, public db : AngularFireDatabase) {
    this.chat = db.list('/chats/' + this.currentUser + "/" + this.chatName).valueChanges();
  }

  ngOnInit(): void {

  }
  
  onSubmit(){
    this.db.list('/chats/' + this.currentUser + "/" + this.chatName).push({
      message : this.newMessage,
      sender : this.currentUser,
    });
    this.db.list('/chats/' + this.searchedUser + "/" + this.chatName).push({
      message : this.newMessage,
      sender : this.currentUser,
    });
    this.currUser = this.db.list('/chats/' + this.currentUser + "/" + this.chatName).valueChanges();
    this.currUser.subscribe(data =>{
      
    if (data.length == 1){
      this.db.list('/chats/' + this.currentUser + "/userChats/").push({
        chatname : this.chatName,
        guestUser : this.searchedUser
      })
      this.db.list('/chats/' + this.searchedUser + "/userChats/").push({
        chatname : this.chatName,
        guestUser : this.currentUser
      })
    }
      
    })
    
    this.newMessage = '';
    this.flag = false;
  }

}
