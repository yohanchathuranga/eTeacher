import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  booking: any;
  constructor(private http: Http) { }

  newBooking(booking) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/booking/newbooking', booking, { headers: headers }).map(res => res.json());
  }


  getBookings(){
    return this.http.get('http://localhost:3000/booking/allbookings')
    .map(res => res.json());
  }

  getBookingbyDate(booking){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/booking/bookingbydate',{ headers: headers })
    .map(res => res.json());
  }

  getBookingbystusentId(booking){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/booking/bookingbydate',{ headers: headers })
    .map(res => res.json());
  }

  getBookingbyteacherId(booking){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/booking/bookingbydate',{ headers: headers })
    .map(res => res.json());
  }

  updateBooking(booking){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.put('http://localhost:3000/booking/editbooking',JSON.stringify(booking),{ headers: headers })
    .map(res => res.json());
  }

  deleteBooking(booking){
    return this.http.delete('http://localhost:3000/booking/deletebooking')
    .map(res => res.json());
  }

}
