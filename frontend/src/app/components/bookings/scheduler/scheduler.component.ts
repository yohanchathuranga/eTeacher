import { Component, ViewChild, Input } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import timeGrigPlugin from '@fullcalendar/timegrid';
import 'fullcalendar';
import { BookingService } from '../../../services/booking.service'
import { Router } from '@angular/router'
import { Bookings } from '../../../models/bookings'


@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})

export class SchedulerComponent {
  @Input() booking: Bookings;
  bookings: Array<Bookings>;
  showModal: boolean;
  bookingModal = false;
  options: any;
  eventsModel: any[] = [];
  calendarVisible = true;
  calendarWeekends = true;
  calendarEvents: EventInput[] = [
    {start: new Date(), end: new Date, studentid: 'user', teacherid: 'teacher' }
  ];
  datebook: any;
  timebook: any;
  @ViewChild('calendar', { static: true }) calendarComponent: FullCalendarComponent; // the #calendar in the template
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];

  constructor(private bookingService: BookingService, private router: Router) { }
  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  ngOnInit() {
    this.options = {
      editable: true,
      disableDragging: false,
      selectable: true,
      eventLimit: true,
      validRange: {
        start: '2017-05-01',
        end: '2021-06-01'
      },
      businessHours: {
        start: '08:00:00',
        end: '18:00:00',
        dow: [1, 2, 3, 4, 5]
      },
    };

    this.bookingService.getBookings().subscribe(res => {
      console.log(res[2].date)
      let i;
      for (i = 0; i < res.length; i++) {
        if (res[i].status == 'pending') {
          res[i].color = '#6180fa'

        } else if (res[i].status == 'confirm') {
          res[i].color = '#ffee52'
        }
       else if (res[i].status == 'notavilable') {
          res[i].color = '#63615a'
      }
        this.calendarEvents = res
      }
    })
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  eventClick(event) {
    this.showModal = true
    console.log(event)
  }

  dateClick(model) {
  }

  eventRender(info, element) {
    if (info.status == 'pending') {
      element.css('background-color', '#000');
    }
  }

  hide() {
    this.showModal = false;
    this.bookingModal = false;

  }

  gotoPast() {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
  }

  addBookingEvent(booking) {
    this.bookingModal = true;
    this.booking = booking; 

  }
  addBooking(booking) {
    this.bookingService.newBooking(booking).subscribe(res => {
    })
    this.bookingModal = false;
    this.booking = null
    location.reload()

  }

  updateBookingEvent(booking) {
    this.bookingModal = true; 
    this.booking = booking;
  }

  updateBooking(booking) {
    this.bookingService.updateBooking(booking).subscribe(res => {
    })
    this.bookingModal = false;
    this.booking = null
    location.reload()

  }

  handleDateClick(event) {
    let da=event.date
    let user=localStorage.getItem('user');
    this.timebook = ((event.date).toTimeString()).split(' ')[0];
    const currdate: Date = new Date();
    if (currdate <= event.date) {  // back date validation
      let date1 = JSON.stringify(event.date)
      date1 = date1.slice(1, 11)
      this.datebook=date1
      let date2 = new Date();
      date2 = event.date;

      if (!this.booking) {
        const booking = {
          _id:'',
          date: date1,
          start: da,
          endtime: date2,
          //subject:teacher.subject,
          studentid: 'lasith',    //user.id
          teacherid: 'kasun',     //parameter value
          status: 'pending',

        }
          this.addBookingEvent(booking)
      } else {
        const booking = {
          _id: this.booking._id,
          date: da,
          start: event.date,
          endtime: date2,
          //subject:this.booking.subject,
          studentid: this.booking.studentid,
          teacherid: this.booking.teacherid,
          status: 'pending',

        }
        this.updateBookingEvent(booking)
        // if (confirm('Would you like to update your booking to ' + event.dateStr + ' ?')) {
        //   this.bookingService.updateBooking(booking).subscribe(res => {
        //   })

      }
      

    }else{
      if (confirm('Back Date !')) {}
    }
  }

}
