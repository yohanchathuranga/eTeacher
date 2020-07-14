import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.component.html',
  styleUrls: ['./view-comments.component.css']
})
export class ViewCommentsComponent implements OnInit {

  constructor(private admin : AdminService) { }

  ngOnInit(): void {
    this.admin.getAllComments().subscribe(result =>{
      console.log(result);
    }),err => {
      console.log(err)
    }
  }

}
