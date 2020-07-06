import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-testing-user-page',
  templateUrl: './testing-user-page.component.html',
  styleUrls: ['./testing-user-page.component.css']
})
export class TestingUserPageComponent implements OnInit {

  public users =[];
  public itemValue = "";
  items : Observable<any[]>;
  currentUser : any;
  searchedUser : any;

  constructor(private user : UserService, public db : AngularFireDatabase) { 
    this.items = db.list('items').valueChanges();
  }
  
    ngOnInit(): void {
      this.user.getusers().subscribe(
        result => {
          this.users = result
          console.log(this.users);
        },
        err => {
          console.log("err")
        }
      )
  
    }
    
    printTheButton(username : String){
      console.log(username);
      this.searchedUser = username;
      localStorage.setItem("currentUser", "Heshan");
      localStorage.setItem("searchedUser", this.searchedUser);
    }
  
    onSubmit(){
      this.db.list('items').push({
        content : this.itemValue
      })
      this.itemValue = '';
    }

}
