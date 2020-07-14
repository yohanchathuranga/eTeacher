import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  
  public users = [];
  public deletedUsers = [];
  public teacherFlag : boolean;
  public studentFlag : boolean;
  public flag = 0;

  constructor(private admin : AdminService) { }

  ngOnInit(): void {
    this.admin.getUsersAdmin().subscribe(
      result => {
        this.users = result
        // console.log(this.users);
      },
      err => {
        console.log(err);
      }
    )
  }

  removeTeacher(user){
    console.log("This is the remove teacher method")
    console.log(user);
    this.admin.removeTeacherFlag(user).subscribe(
      result => {
        console.log(result)
      },
      err => {
        console.log(err);
      }
    )
  }

  removeUser(user){
    this.admin.setDeletedUser(user).subscribe(
      result => {
        // console.log(result)
      },
      err => {
        console.log(err);
      }
    )
    this.admin.delAvaiUser(user._id).subscribe(
      result => {
        // console.log(result)
      },
      err => {
        console.log(err);
      }
    )
    window.location.reload();
  }

  removeStudent(user){
    console.log("This is the remove student method")
    console.log(user);
    this.admin.removeStudentFlag(user).subscribe(
      result => {
        // console.log(result)
      },
      err => {
        console.log(err);
      }
    )
  }

}
