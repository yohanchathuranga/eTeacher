import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-view-forums',
  templateUrl: './view-forums.component.html',
  styleUrls: ['./view-forums.component.css']
})
export class ViewForumsComponent implements OnInit {

  forums : any;

  constructor(private admin : AdminService) { }

  ngOnInit(): void {
    this.admin.getAllForums().subscribe(
      result => {
        this.forums = result
        console.log(this.forums);
      },
      err => {
        console.log(err);
      }
    )
  }

  removeForum(forum){
    this.admin.setDeletedForum(forum).subscribe(
      result => {
        // console.log(result)
      },
      err => {
        console.log(err);
      }
    )
    this.admin.delAvaiForum(forum._id).subscribe(
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
