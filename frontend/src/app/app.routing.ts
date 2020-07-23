import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { SignupComponent } from './examples/signup/signup.component';
import { LandingComponent } from './examples/landing/landing.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { TestingPageComponent } from './Pages/testing-page/testing-page.component';
import { MessagingPageComponent } from './Pages/messaging-page/messaging-page.component';
import { ChatPageComponent } from './Pages/chat-page/chat-page.component';
import { TestingUserPageComponent } from './Pages/testing-user-page/testing-user-page.component';
import {TestingpagetwoComponent} from './Pages/testingpagetwo/testingpagetwo.component';

const routes: Routes =[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',             component: ComponentsComponent },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'signup',           component: SignupComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'nucleoicons',      component: NucleoiconsComponent },
    { path: 'testingpage',      component: TestingPageComponent },
    { path: 'pages/messagingpage',      component: MessagingPageComponent },
    { path: 'pages/chatpage', component: ChatPageComponent},
    { path: 'pages/testingUserPage', component : TestingUserPageComponent},
    { path: 'forum',      component: TestingpagetwoComponent }
];
 
@NgModule({
  imports: [
    CommonModule,   
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
