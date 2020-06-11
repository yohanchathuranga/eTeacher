import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpModule } from '@angular/http';

// import { FlashMessageModule} from 'flash-messages';

import { AppComponent } from './app.component';


import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ComponentsComponent } from './components/components.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import {NewbookingComponent } from './components/bookings/newbooking/newbooking.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserService } from './services/user.service';
import { BookingService } from './services/booking.service';


// import { ComponentsModule } from './components/components.module';



@NgModule({
  declarations: [
    
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SchedulerComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    NewbookingComponent,
    ComponentsComponent,
    
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    // FlashMessageModule ,
    RouterModule,
    AppRoutingModule,
    FullCalendarModule,
    HttpModule,
    
  ],
  providers: [UserService,BookingService,{provide: module, useClass: UserService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
