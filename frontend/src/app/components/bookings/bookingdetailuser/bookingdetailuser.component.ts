import { Component, OnInit, EventEmitter, Input, ViewChild, Output } from '@angular/core';
import { Bookings } from '../../../models/bookings'
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import timeGrigPlugin from '@fullcalendar/timegrid';
import 'fullcalendar';
import { BookingService } from 'app/services/booking.service';

@Component({
  selector: 'app-bookingdetailuser',
  templateUrl: './bookingdetailuser.component.html',
  styleUrls: ['./bookingdetailuser.component.css']
})
export class BookingdetailuserComponent implements OnInit {
  @Input() booking: Bookings;
  showViewModal: boolean;
  deleteModal:boolean=false;
  showUpdateModal:boolean=false;
  messege:String=""
  date:String
  start:String
  endtime:String

  bookings: Array<Bookings>
  options: any;
  eventsModel: any[] = [];
  calendarVisible = true;
  calendarWeekends = true;
  calendarEvents: EventInput[] = [
    { title: 'Event Now', start: new Date(), end: new Date, studentid: 'user', teacherid: 'teacher' }
  ];


  constructor(private bookingService: BookingService) { }
  @ViewChild('calendar', { static: false }) calendarComponent: FullCalendarComponent; // the #calendar in the template  
  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
 

  ngOnInit(): void {
    console.log(this.booking);
    this.showViewModal = true

    this.bookingService.getBookings().subscribe(res => {
      var i;
      for (i = 0; i < res.length; i++) {
        if (res[i].status == "pending") {
          res[i].color = '#24c4f0'

        } else if (res[i].status == "confirm") {
          res[i].color = '#05f742'
        }
        this.calendarEvents = res
      }

    })
  }

  ngOnChanges() {
    this.showViewModal = true

  }
  @Output() updatebooking=new EventEmitter();
  updateBookingEvent(booking) {
    this.updatebooking=booking;
    this.showUpdateModal=true;
  }
  
  
 
  updateBooking(booking) { 
    
    this.showUpdateModal=false;
    const updatedbooking = {
      _id:booking._id,
      date: this.date,
      start: this.start,
      endtime: this.endtime,
      // subject:booking.subject,
      studentid: booking.studentid,
      teacherid: booking.teacherid,
      status: "pending" 
    }
    this.bookingService.updateBooking(updatedbooking).subscribe(res => {
    })
    
    location.reload()
    this.showViewModal = false;
  }

  cancelBooking(booking) {
    const cancelbooking = {
      _id:booking._id,
      date: booking.date,
      start: booking.start,
      endtime: booking.endtime,
      //subject:booking.subject,
      studentid: booking.studentid,
      teacherid: booking.teacherid,
      status: "cancelled" 
    }
    this.bookingService.updateBooking(cancelbooking).subscribe(res => {
    })
    
    location.reload()
    this.showViewModal = false;
  }

  deleteBookingEvent(booking) {

    this.deleteModal=true;
  }

  deleteBooking(booking) {
    this.deleteModal=false;
    this.bookingService.deleteBooking(booking).subscribe(res => {
    })
    location.reload()
  }

  hide() {
    this.messege ="Warning";
    this.showViewModal = false;
  }
  hidedelete() {
    this.deleteModal=false;
  }

  hideupdate() {
    this.showUpdateModal=false;
  }

}
