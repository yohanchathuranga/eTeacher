import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {HttpClient,HttpParams, HttpHeaders} from '@angular/common/http'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/groupBy'


@Injectable({
  providedIn: 'root'
})
export class BookingService {
  booking: any;
  constructor(private http: Http,private httpclient:HttpClient) { }

  newBooking(booking) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/booking/newbooking', booking, { headers: headers }).map(res => res.json());
  }


  getBookings(){
    return this.http.get('http://localhost:3000/booking/allbookings')
    .map(res => res.json());
  }

  getBookingbyDateUser(date,studentid){
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    let params = new HttpParams().set("date",date).set("studentid", studentid);
    console.log(studentid)
    return this.httpclient.get('http://localhost:3000/booking/bookingbydateuser',{headers: headers,params: params });
  }

  getBookingbyDateTeacher(date,teacherid){
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    let params = new HttpParams().set("date",date).set("teacherid", teacherid);
    console.log(teacherid)
    return this.httpclient.get('http://localhost:3000/booking/bookingbydateteacher',{headers: headers,params: params });
  }

  getBookingbydaycount(date){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/booking/bookingbydaycount'+date,{ headers: headers })
    .map(res => res.json());
  }

  getBookingbystudentId(studentid){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/booking/bookingbystudent/'+studentid,{ headers: headers })
    .map(res => res.json());
  }

  getBookingbyteacherId(teacherid){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/booking/bookingbyteacher'+teacherid,{ headers: headers})
    .map(res => res.json());;
  }

  getBookingbydateteacherid(booking){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/booking/bookingbyteacherdate'+booking,{ headers: headers }).groupBy(booking)
    .map(res => res);
  }

  updateBooking(booking){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.put('http://localhost:3000/booking/editbooking'+booking._id,JSON.stringify(booking),{ headers: headers })
    .map(res => res.json());
  }

  deleteBooking(booking){
    return this.http.delete('http://localhost:3000/booking/deletebooking'+booking._id)
    .map(res => res.json());
  }

}
