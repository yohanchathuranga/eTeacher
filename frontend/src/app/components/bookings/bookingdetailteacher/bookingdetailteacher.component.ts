import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { Bookings } from '../../../models/bookings'
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from 'app/services/booking.service';

@Component({
  selector: 'app-bookingdetailteacher',
  templateUrl: './bookingdetailteacher.component.html',
  styleUrls: ['./bookingdetailteacher.component.css'],
})

export class BookingdetailteacherComponent implements OnInit {
  @Input() booking: Bookings;
  showModal: boolean;
  deleteModal:boolean=false;
  editTitle: boolean = false;
  updateBookingEvent = new EventEmitter();
  messege:String=""
 


  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.showModal = true
  }
  ngOnChanges() {
    this.editTitle = false;
    this.showModal = true

  }


  onTitleClick() {

    this.editTitle = true;
  }

  confirmBooking(booking) {
    console.log(booking)
    const confirm = {
      _id:booking._id,
      date: booking.date,
      start: booking.start,
      endtime: booking.endtime,
      studentid: booking.studentid,
      teacherid: booking.teacherid,
      status: "confirm" 
    }
    this.bookingService.updateBooking(confirm).subscribe(res => {
    })
    
    // location.reload()
    this.showModal = false;
  }

  deleteBookingEvent(booking) {
    console.log(booking)
    this.deleteModal=true;
  }

  deleteBooking(booking) {
    console.log(booking)
    this.deleteModal=false;
    this.bookingService.deleteBooking(booking).subscribe(res => {
      console.log(res)
    })
    location.reload()
  }

  hide() {
    this.messege ="Warning";
    this.showModal = false;
  }
  hidedelete() {
    this.deleteModal=false;
  }
}
