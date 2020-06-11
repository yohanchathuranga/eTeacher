import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ComponentsComponent } from './components/components.component';
import {NewbookingComponent } from './components/bookings/newbooking/newbooking.component';
import { LandingComponent } from './examples/landing/landing.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';

const routes: Routes =[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',             component: ComponentsComponent},
    { path: 'scheduler',        component: SchedulerComponent },
    { path: 'profile',     component: ProfileComponent },
    { path: 'newbooking',     component: NewbookingComponent },
    { path: 'login',           component: LoginComponent },
    { path: 'register',          component: RegisterComponent },
    
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
