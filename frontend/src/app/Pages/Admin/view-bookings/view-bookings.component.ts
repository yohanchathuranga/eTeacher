import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent implements OnInit {

  bookings : any;

  constructor(private admin : AdminService) { }

  ngOnInit(): void {
    this.admin.getAllBookings().subscribe(result => {
      console.log(result)
      this.bookings = result
    }),err =>{
      console.log(err)
    }
  }

}
