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
  showViewModal: boolean;
  showDeleteModal:boolean=false;
  editTitle: boolean = false;
  updateBookingEvent = new EventEmitter();
  messege:String=""
 


  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.showViewModal = true
  }
  ngOnChanges() {
    this.editTitle = false;
    this.showViewModal = true

  }


  onTitleClick() {

    this.editTitle = true;
  }

  confirmBooking(booking) {
    const confirm = {
      _id:booking._id,
      date: booking.date,
      start: booking.start,
      endtime: booking.endtime,
      //subject:booking.subject,
      studentid: booking.studentid,
      teacherid: booking.teacherid,
      status: "confirm" 
    }
    this.bookingService.updateBooking(confirm).subscribe(res => {
    })
    
    location.reload()
    this.showViewModal = false;
  }

  deleteBookingEvent(booking) {

    this.showDeleteModal=true;
  }

  deleteBooking(booking) {
    this.showDeleteModal = false;
    const cancel= {
      _id: booking._id,
      date: booking.date,
      start: booking.start,
      endtime: booking.endtime,
      //subject:booking.subject,
      studentid: booking.studentid,
      teacherid: booking.teacherid,
      status: "cancel"
    }
    this.bookingService.updateBooking(cancel).subscribe(res => {
      console.log(res)
    })
    location.reload()
  }

  hide() {
    this.messege ="Warning";
    this.showViewModal = false;
  }
  hidedelete() {
    this.showDeleteModal=false;
  }
}
