import { Component, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import timeGrigPlugin from '@fullcalendar/timegrid';
import 'fullcalendar';
import {BookingService} from '../../services/booking.service' 
import {Router} from '@angular/router'


@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})

export class SchedulerComponent {
  showModal: boolean;
  options: any;
  eventsModel: any[] = [];
  calendarVisible = true;
  calendarWeekends = true;
  calendarEvents: EventInput[] = [
    { title: 'Event Now', start: new Date() ,end:new Date,studentid:'user',teacherid:'teacher'}
  ];

  constructor(private bookingService:BookingService, private router:Router) { }

  @ViewChild('calendar', { static: false }) calendarComponent: FullCalendarComponent; // the #calendar in the template  
  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }
  calendarPlugins = [dayGridPlugin,timeGrigPlugin, interactionPlugin];
  
  ngOnInit() {
    this.options = {
      editable: true,
      disableDragging: false,
      selectable: true,
      eventLimit:true,
      businessHours: true,
      theme: 'standart',
      validRange: {
        start: '2017-05-01',
        end: '2021-06-01'
      },
      eventClick:"eventClick(event)",
      plugins: [dayGridPlugin]
    };


    // this.calendarEvents = [{ title: 'event 1', date: '2020-06-11T06:00:00+05:30' },
    // { title: 'event 2', date: '2020-06-09' }];
    this.bookingService.getBookings().subscribe(res=>{
      console.log(res)
      this.calendarEvents=res
    })
  }
  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  eventClick(event, jsEvent, view){
    
    this.showModal = true
    console.log(event.date)
  }

  dateClick(model) {
  }

  eventDragStop(model) {
  }

  hide()
  {
    this.showModal = false;
  }

  gotoPast() {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object  
  }

  handleDateClick(arg) { 
    let date1 = JSON.stringify(arg.date)
      date1 = date1.slice(1,11)
      let date2=new Date();
      date2=arg.date;
      date2.setHours(date2.getHours()+2)
      console.log(date2);
      
    const booking={
      date:date1,
      start:arg.date,
      endtime:date2,
      studentid:"lasith",
      teacherid:"kasun",
      status:"pending",
      allDay: arg.allDay,
      color:arg.color

    }
    
    if (confirm('Would you like to add a booking to ' + arg.dateStr + ' ?')) {
      
      this.bookingService.newBooking(booking).subscribe(res=>{
        console.log(res)
      })
        
    }
  }

}  
