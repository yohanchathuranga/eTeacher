import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';

import { AppComponent } from './app.component';


import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';

import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
 import { TestingPageComponent } from './Pages/testing-page/testing-page.component';


@NgModule({
  declarations: [
    
    AppComponent,
    NavbarComponent,
    FooterComponent,
    TestingPageComponent,
     SchedulerComponent
    
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ComponentsModule,
    ExamplesModule,
    AppRoutingModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
