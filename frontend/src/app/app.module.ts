import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http'
import { NgxPaginationModule } from 'ngx-pagination';
// import {FlashMessagesModule} from 'flash-messages';

import { AppComponent } from './app.component';


import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ComponentsComponent } from './components/components.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import {NewbookingComponent } from './components/bookings/newbooking/newbooking.component';
import {TeacherbookingsComponent } from './components/bookings/teacherbookings/teacherbookings.component';
import {UserbookingsComponent } from './components/bookings/userbookings/userbookings.component';
import {BookingdetailteacherComponent } from './components/bookings/bookingdetailteacher/bookingdetailteacher.component';
import {BookingdetailuserComponent } from './components/bookings/bookingdetailuser/bookingdetailuser.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserService } from './services/user.service';
import { BookingService } from './services/booking.service';


// import { ComponentsModule } from './components/components.module';
import { TestingPageComponent } from './Pages/testing-page/testing-page.component';
import { TestingpagetwoComponent } from '../app/Pages/testingpagetwo/testingpagetwo.component';
import { TestingpagethreeComponent } from '../app/Pages/testingpagethree/testingpagethree.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CreateThreadComponent } from './Pages/testingpagetwo/create-thread/create-thread.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
//import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
// import {NgxPaginationModule} from 'ngx-pagination';
import {MatDialogModule} from '@angular/material/dialog';
import { ViewThreadComponent } from './Pages/testingpagetwo/view-thread/view-thread.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ReplyCommentComponent } from './Pages/testingpagetwo/view-thread/reply-comment/reply-comment.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import { ToastrModule } from 'ngx-toastr';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ForumTypeComponent } from './Pages/testingpagetwo/forum-type/forum-type.component';
import { MatInputModule} from '@angular/material/input';
import { MyFilterPipe } from 'app/Pages/testingpagetwo/service/myFilter.pipe';
import { CheckForumTypeDirective } from './Pages/testingpagetwo/service/check-forum-type.directive';
import { AdminProfileComponent } from './Pages/Admin/admin-profile/admin-profile.component';
import { ViewUsersComponent } from './Pages/Admin/view-users/view-users.component';
import { DeletedusersComponent } from './Pages/Admin/deletedusers/deletedusers.component';
import { ViewForumsComponent } from './Pages/Admin/view-forums/view-forums.component';
import { DeletedForumsComponent } from './Pages/Admin/deleted-forums/deleted-forums.component';
import { AdminChartsComponent } from './Pages/Admin/admin-charts/admin-charts.component';
import { ViewCommentsComponent } from './Pages/Admin/view-comments/view-comments.component';
import { ViewBookingsComponent } from './Pages/Admin/view-bookings/view-bookings.component';
import { ViewComplainsComponent } from './Pages/Admin/view-complains/view-complains.component';
import { DeletedComplainsComponent } from './Pages/Admin/deleted-complains/deleted-complains.component';





@NgModule({
  declarations: [

    AppComponent,
    NavbarComponent,
    FooterComponent,
    TestingPageComponent,
    TestingpagetwoComponent,
    TestingpagethreeComponent,
    CreateThreadComponent,
    ViewThreadComponent,
    ReplyCommentComponent,
    ForumTypeComponent,
    SchedulerComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    NewbookingComponent,
    ComponentsComponent,
    UserbookingsComponent,
    TeacherbookingsComponent,
    BookingdetailteacherComponent,
    BookingdetailuserComponent,
    MyFilterPipe,
    CheckForumTypeDirective,
    AdminProfileComponent,
    ViewUsersComponent,
    DeletedusersComponent,
    ViewForumsComponent,
    DeletedForumsComponent,
    AdminChartsComponent,
    ViewCommentsComponent,
    ViewBookingsComponent,
    ViewComplainsComponent,
    DeletedComplainsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    // FlashMessagesModule.forRoot() ,
    RouterModule,
    AppRoutingModule,
    FullCalendarModule,
    HttpModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
   // MatPaginatorModule,
    MatSortModule,
    NgxPaginationModule,
    MatDialogModule,
    FullCalendarModule,
    AngularEditorModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    ToastrModule.forRoot(),
    MatSnackBarModule,
    MatInputModule
   
  ],
  providers: [UserService,BookingService,{provide: module, useClass: UserService}],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateThreadComponent
  ]
})
export class AppModule { }
