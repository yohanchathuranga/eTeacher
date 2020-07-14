import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-deletedusers',
  templateUrl: './deletedusers.component.html',
  styleUrls: ['./deletedusers.component.css']
})
export class DeletedusersComponent implements OnInit {

  public deletedUsers = [];
  public teacherFlag : boolean;
  public studentFlag : boolean;
  public flag = 0;

  constructor(private admin : AdminService) { }

  ngOnInit(): void {
    this.admin.getDeletedUsersAdmin().subscribe(
      result => {
        this.deletedUsers = result
        console.log(this.deletedUsers);
      },
      err =>{
        console.log(err);
      }
    )
  }

  recoverUser(user){
    this.admin.setRecoverUser(user).subscribe(
      result => {
        // console.log(result)
      },
      err => {
        console.log(err);
      }
    )
    this.admin.recoverUser(user._id).subscribe(
      result => {
        // console.log(result)
      },
      err => {
        console.log(err);
      }
    )
    window.location.reload();
  }

}
