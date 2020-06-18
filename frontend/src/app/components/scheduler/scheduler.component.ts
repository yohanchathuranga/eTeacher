import { Component, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import timeGrigPlugin from '@fullcalendar/timegrid';
import 'fullcalendar';
import { BookingService } from '../../services/booking.service'
import { Router } from '@angular/router'
import { Bookings } from '../../models/bookings'


@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})

export class SchedulerComponent {
  bookings: Array<Bookings>;
  showModal: boolean;
  options: any;
  eventsModel: any[] = [];
  calendarVisible = true;
  calendarWeekends = true;
  calendarEvents: EventInput[] = [
    { title: 'Event Now', start: new Date(), end: new Date, studentid: 'user', teacherid: 'teacher' }
  ];

  constructor(private bookingService: BookingService, private router: Router) { }

  @ViewChild('calendar', { static: false }) calendarComponent: FullCalendarComponent; // the #calendar in the template  
  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];

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
        start: "08:00:00",
        end: "18:00:00",
        dow: [1, 2, 3, 4, 5]
      },
      // theme: true,
      // weekends: true,
      // header: {
      //   left: 'prev,next today',
      //   center: 'title',
      //   right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      // },
      // dateClick: this.handleDateClick(event),
      // eventClick: this.eventClick(event),
      // deepChangeDetection: true,
      // events: this.calendarEvents,
      // minTime: "05:00:00",
      // maxTime: "23:00:00",
      // navLinks: true
    };


    // this.calendarEvents = [{ title: 'event 1', date: '2020-06-11T06:00:00+05:30' },
    // { title: 'event 2', date: '2020-06-09' }];
    this.bookingService.getBookings().subscribe(res => {
      console.log(res[1].date)
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
  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  eventClick(event) {

    this.showModal = true
    console.log(event.date)
  }

  dateClick(model) {
  }

  eventRender(info, element) {
    if (info.status == "pending") {
      element.css('background-color', '#000');
    }

  }

  eventDragStop(model) {
  }

  hide() {
    this.showModal = false;
  }

  gotoPast() {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object  
  }

  handleDateClick(event) {
    let currdate: Date = new Date();
    if (currdate <= event.date) {  //back date validation
      let date1 = JSON.stringify(event.date)
      date1 = date1.slice(1, 11)
      let date2 = new Date();
      date2 = event.date;
      date2.setHours(date2.getHours() + 2)
      console.log(date2);

      const booking = {
        date: date1,
        start: event.date,
        endtime: date2,
        studentid: "lasith",
        teacherid: "kasun",
        status: "pending",
        allDay: event.allDay,
        color: event.color

      }

      if (confirm('Would you like to add a booking to ' + event.dateStr + ' ?')) {

        this.bookingService.newBooking(booking).subscribe(res => {
          console.log(res)
        })

      }
    } else {
      console.log("back date")
    }
  }

}  
