import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';

import { BasicelementsComponent } from './basicelements/basicelements.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TypographyComponent } from './typography/typography.component';
import { NucleoiconsComponent } from './nucleoicons/nucleoicons.component';
import { ComponentsComponent } from './components.component';
import { NotificationComponent } from './notification/notification.component';
import { NgbdModalComponent } from './modal/modal.component';
import { NgbdModalContent } from './modal/modal.component';
import { SchedulerComponent } from './bookings/scheduler/scheduler.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { NewbookingComponent } from './bookings/newbooking/newbooking.component';
import { UserbookingsComponent } from './bookings/userbookings/userbookings.component';
import { TeacherbookingsComponent } from './bookings/teacherbookings/teacherbookings.component';
import { BookingdetailteacherComponent } from './bookings/bookingdetailteacher/bookingdetailteacher.component';
import { BookingdetailuserComponent } from './bookings/bookingdetailuser/bookingdetailuser.component';
import { PasswordresetComponent } from './password/passwordreset/passwordreset.component';
import { UpdatepasswordComponent } from './password/updatepassword/updatepassword.component';
import { StudentViewComponent } from './Profiles/student-view/student-view.component';
import { TeacherViewComponent } from './Profiles/teacher-view/teacher-view.component';
import { StudentAccComponent } from './Profiles/student-acc/student-acc.component';
import { TeacherAccComponent } from './Profiles/teacher-acc/teacher-acc.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        RouterModule,
        JwBootstrapSwitchNg2Module
    ],
    declarations: [
        ComponentsComponent,
        BasicelementsComponent,
        NavigationComponent,
        TypographyComponent,
        NucleoiconsComponent,
        NotificationComponent,
        NgbdModalComponent,
        NgbdModalContent,
        SchedulerComponent,
        LoginComponent,
        RegisterComponent,
        ProfileComponent,
        NewbookingComponent,
        UserbookingsComponent,
        TeacherbookingsComponent,
        BookingdetailteacherComponent,
        BookingdetailuserComponent,
        PasswordresetComponent,
        UpdatepasswordComponent,
        StudentViewComponent,
        TeacherViewComponent,
        StudentAccComponent,
        TeacherAccComponent
    ],
    entryComponents: [NgbdModalContent],
    exports:[ ComponentsComponent ]
})
export class ComponentsModule { }
