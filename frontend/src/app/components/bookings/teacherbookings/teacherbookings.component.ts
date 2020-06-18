import { Component, OnInit ,EventEmitter,Output} from '@angular/core';
import { BookingService } from '../../../services/booking.service'
import {Bookings} from '../../../models/bookings'



@Component({
  selector: 'app-teacherbookings',
  templateUrl: './teacherbookings.component.html',
  styleUrls: ['./teacherbookings.component.css']
})
export class TeacherbookingsComponent implements OnInit {
  bookings: Array<Bookings>
  public SelectBooking = new EventEmitter();
  teacherId:String;
  page:any;
  pageSize: number;
  size:number
  showModal: boolean;
  today=new Date;
  bookingcount:number;
  
  constructor(private bookingService:BookingService,) { }

  ngOnInit(): void {
    const teacherId="kasun"

    this.page = 1
    this.pageSize=10
    this.bookingService.getBookingbyteacherId(teacherId).subscribe(res => {
      this.bookings=res
      this.size=this.bookings.length
      console.log(this.bookings.length)
      
    })

    let date1 = JSON.stringify(this.today)
    date1 = date1.slice(1, 11)
    this.bookingService.getBookingbyDateTeacher(date1,teacherId).subscribe(res => {
    this.bookingcount=Object.keys(res).length
    console.log(this.bookingcount) 
    })

  }
  @Output() SelectedBooking = new EventEmitter();
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
