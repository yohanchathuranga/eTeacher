import { Component, OnInit,ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service';
// import { FlashMessageService } from 'flash-messages';
import { Router } from '@angular/router';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import timeGrigPlugin from '@fullcalendar/timegrid';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-newbooking',
  templateUrl: './newbooking.component.html',
  styleUrls: ['./newbooking.component.css']
})
export class NewbookingComponent implements OnInit {
  showModal: boolean;
  title = 'ngularfullcalendarbootstrap';
  name:string;
  date:string;
  calendarOptions: any;
  calendarVisible = true;
  calendarWeekends = true;
  calendarEvents: EventInput[] = [
    { title: 'Event Now', start: new Date() ,end:new Date,studentid:'user',teacherid:'teacher'}
  ];
  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }
  calendarPlugins = [dayGridPlugin,timeGrigPlugin, interactionPlugin];

  constructor(private users:UserService,private router:Router, private datePipe:DatePipe) { }
  @ViewChild('calendar', { static: false }) calendarComponent: FullCalendarComponent; // the #calendar in the template  
  ngOnInit() {
    this.calendarOptions = {
      editable: true,
      selectable: true,
      eventLimit:true,
      businessHours: true,
      
      validRange: {
        start: '2017-05-01',
        end: '2021-06-01'
      },
      eventClick:"eventClick(event)",
      plugins: [dayGridPlugin]
    };
    this.calendarEvents = [{ title: 'event 1', date: '2020-06-11T06:00:00+05:30' },
    { title: 'event 2', date: '2020-06-09' }];
    }

    eventClick(event) {
      // this.name = model.event.title;
      // this.date = model.event.date;
      console.log(event)
      this.showModal = true;
    }
    hide()
  {
    this.showModal = false;
  }
  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }
  

  

}
