import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-view-complains',
  templateUrl: './view-complains.component.html',
  styleUrls: ['./view-complains.component.css']
})
export class ViewComplainsComponent implements OnInit {

  complains : any;

  constructor(private admin : AdminService) { }

  ngOnInit(): void {
    this.admin.getAllComplains().subscribe(result =>{
      this.complains = result
      console.log(result)
    }),err =>{
      console.log(err)
    }
  }

  removeComplain(complain){
    this.admin.setDeletedComplain(complain).subscribe(
      result => {
        // console.log(result)
      },
      err => {
        console.log(err);
      }
    )
    this.admin.delAvaiComplain(complain._id).subscribe(
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
