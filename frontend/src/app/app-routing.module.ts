import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulerComponent } from './components/bookings/scheduler/scheduler.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ComponentsComponent } from './components/components.component';
import {NewbookingComponent } from './components/bookings/newbooking/newbooking.component';
import {TeacherbookingsComponent } from './components/bookings/teacherbookings/teacherbookings.component';
import {UserbookingsComponent } from './components/bookings/userbookings/userbookings.component';
import { LandingComponent } from './examples/landing/landing.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
// import { TestingPageComponent } from './Pages/testing-page/testing-page.component';
import {TestingpagetwoComponent} from './Pages/testingpagetwo/testingpagetwo.component';
import { ViewThreadComponent } from './Pages/testingpagetwo/view-thread/view-thread.component';
import { ForumTypeComponent } from './Pages/testingpagetwo/forum-type/forum-type.component';



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
    // { path: 'user-profile',     component: ProfileComponent },
    // { path: 'signup',           component: SignupComponent },
    // { path: 'landing',          component: LandingComponent },
    { path: 'nucleoicons',      component: NucleoiconsComponent },
    // { path: 'testingpage',      component: TestingPageComponent }
    { path: 'forum',      component: TestingpagetwoComponent },
    { path: 'forum/:id',      component: ViewThreadComponent },
    { path: ':type' , component:ForumTypeComponent},
    { path: ':type/:id', component: ViewThreadComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
