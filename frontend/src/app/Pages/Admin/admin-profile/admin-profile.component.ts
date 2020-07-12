import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  public users = [];

  constructor(private admin : AdminService) { }

  ngOnInit(): void {
  }

  getUsersAdmin(){
    this.admin.getUsersAdmin().subscribe(
      result => {
        this.users = result
        console.log(this.users);
      },
      err => {
        console.log(err);
      }
    )
  }

}
