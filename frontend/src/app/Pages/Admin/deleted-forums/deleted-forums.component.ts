import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-deleted-forums',
  templateUrl: './deleted-forums.component.html',
  styleUrls: ['./deleted-forums.component.css']
})
export class DeletedForumsComponent implements OnInit {

  delForums : any;

  constructor(private admin : AdminService) { }

  ngOnInit(): void {
    this.admin.getDelForums().subscribe(
      result => {
        this.delForums = result
        console.log(this.delForums);
      },
      err => {
        console.log(err);
      }
    )
  }

}
