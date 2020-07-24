import { Component, OnInit , EventEmitter, Output} from '@angular/core';
import { BookingService } from '../../../services/booking.service'
import {Bookings} from '../../../models/bookings'
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import timeGrigPlugin from '@fullcalendar/timegrid';
import 'fullcalendar';



@Component({
  selector: 'app-userbookings',
  templateUrl: './userbookings.component.html',
  styleUrls: ['./userbookings.component.css']
})
export class UserbookingsComponent implements OnInit {
  bookings: Array<Bookings>
  public SelectBooking = new EventEmitter();
  studentId: String;
  todaycon=0;
  todaypen=0;

  conpage:number
  penpage:number
  conpageSize: number;
  penpageSize: number;
  confirmsize:number=0;
  pendingsize:number=0;
  showModal: boolean;
  today=new Date;
  bookingcount:number;

  calendarVisible = true;
  calendarWeekends = true;
  calendarEvents: EventInput[]
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  @Output() SelectedBooking = new EventEmitter();
  
  constructor(private bookingService: BookingService,) { }

  ngOnInit(): void {
    let user=localStorage.getItem('user')
    const studentId="lasith"      //user.id
    const date="2020-06-11"
    

    this.conpage=1 
    this.penpage=1
    this.conpageSize=10
    this.penpageSize=10
    this.bookingService.getBookingbystudentId(studentId).subscribe(res => {
      
      this.bookings=res
      var i;
      for (i = 0; i < this.bookings.length; i++) {
        if (this.bookings[i].status == "pending") {
          this.bookings[i].color = '#6180fa'
          this.pendingsize += 1;

        } else if (this.bookings[i].status == "confirm") {
          this.bookings[i].color = '#ffee52'
          this.confirmsize+=1;
        }
        this.calendarEvents = res
      }
      console.log(this.confirmsize)
      
    })

    let date1 = JSON.stringify(this.today)
    date1 = date1.slice(1, 11)
    this.bookingService.getBookingbyDateUser(date1,studentId).subscribe(res => {
      var j;
      for (j = 0; j < Object.keys(res).length; j++) {
        if (res[j].status == "pending") {
          this.todaypen += 1;

        } else if (res[j].status == "confirm") {
          this.todaycon += 1;
        }
      }
    })


  }
  updateBookingEvent(id){
    this.bookingService.updateBooking(id)
    .subscribe(res=>res);  
  }
 
  onSelect(booking){
    this.SelectBooking.emit(booking)
    this.SelectedBooking=booking;
    this.showModal = true
  }
  hide() {
    this.showModal = false;
  }

}
