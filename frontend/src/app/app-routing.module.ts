import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ComponentsComponent } from './components/components.component';
import {NewbookingComponent } from './components/bookings/newbooking/newbooking.component';
import {TeacherbookingsComponent } from './components/bookings/teacherbookings/teacherbookings.component';
import {UserbookingsComponent } from './components/bookings/userbookings/userbookings.component';
import { LandingComponent } from './examples/landing/landing.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { TestingPageComponent } from './Pages/testing-page/testing-page.component';
import {TestingpagetwoComponent} from './Pages/testingpagetwo/testingpagetwo.component';
import { ViewThreadComponent } from './Pages/testingpagetwo/view-thread/view-thread.component';
import { ForumTypeComponent } from './Pages/testingpagetwo/forum-type/forum-type.component';
import { AdminProfileComponent } from './Pages/Admin/admin-profile/admin-profile.component';
import { TestingpagethreeComponent } from './Pages/testingpagethree/testingpagethree.component';
import { ViewUsersComponent } from './Pages/Admin/view-users/view-users.component';
import { DeletedusersComponent } from './Pages/Admin/deletedusers/deletedusers.component';
import { ViewForumsComponent } from './Pages/Admin/view-forums/view-forums.component';
import { DeletedForumsComponent } from './Pages/Admin/deleted-forums/deleted-forums.component';
import { ViewCommentsComponent } from './Pages/Admin/view-comments/view-comments.component';
import { ViewBookingsComponent } from './Pages/Admin/view-bookings/view-bookings.component';
import { ViewComplainsComponent } from './Pages/Admin/view-complains/view-complains.component';
import { DeletedComplainsComponent } from './Pages/Admin/deleted-complains/deleted-complains.component';


const routes: Routes =[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',             component: ComponentsComponent},
    { path: 'scheduler',        component: SchedulerComponent },
    { path: 'profile',     component: ProfileComponent },
    { path: 'newbooking',     component: NewbookingComponent },
    { path: 'teacherbooking',     component: TeacherbookingsComponent },
    { path: 'userbooking',     component: UserbookingsComponent },
    { path: 'login',           component: LoginComponent },
    { path: 'register',          component: RegisterComponent },
    { path: 'user-profile',     component: ProfileComponent },
    // { path: 'signup',           component: SignupComponent },
    // { path: 'landing',          component: LandingComponent },
    { path: 'nucleoicons',      component: NucleoiconsComponent },
    { path: 'admin',      component: AdminProfileComponent },
    { path: 'admin/viewusers',  component: ViewUsersComponent},
    { path: 'admin/deletedusers',  component: DeletedusersComponent},
    { path: 'admin/viewforums',  component: ViewForumsComponent},
    { path: 'admin/deletedforums',  component: DeletedForumsComponent},
    { path: 'admin/viewcomments', component: ViewCommentsComponent},
    { path: 'admin/viewbookings', component: ViewBookingsComponent},
    { path: 'admin/viewcomplains', component: ViewComplainsComponent},
    { path: 'admin/deletedcomplains', component: DeletedComplainsComponent},
    // { path: 'testingpage',      component: TestingPageComponent }
    { path: 'forum',      component: TestingpagetwoComponent },
    { path: 'forum/:id',      component: ViewThreadComponent },
    { path: ':type' , component:ForumTypeComponent},
    { path: ':type/:id', component: ViewThreadComponent},
    // { path: 'testingpagethree', component: TestingpagethreeComponent},
    
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
