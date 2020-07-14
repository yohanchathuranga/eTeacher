import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-deleted-complains',
  templateUrl: './deleted-complains.component.html',
  styleUrls: ['./deleted-complains.component.css']
})
export class DeletedComplainsComponent implements OnInit {

  delComplains : any;

  constructor(private admin : AdminService) { }

  ngOnInit(): void {
    this.admin.getDelComplains().subscribe(result =>{
      this.delComplains = result
      console.log(result)
    }),err =>{
      console.log(err)
    }
  }

  recoverComplain(complain){
    this.admin.setRecoverComplain(complain).subscribe(
      result => {
        // console.log(result)
      },
      err => {
        console.log(err);
      }
    )
    this.admin.recoverComplain(complain._id).subscribe(
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
