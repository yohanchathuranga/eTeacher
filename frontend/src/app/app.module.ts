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
import { TestingpagetwoComponent } from '../app/Pages/testingpagetwo/testingpagetwo.component';
import { TestingpagethreeComponent } from '../app/Pages/testingpagethree/testingpagethree.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CreateThreadComponent } from './Pages/testingpagetwo/create-thread/create-thread.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
//import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatDialogModule} from '@angular/material/dialog';









@NgModule({
  declarations: [

    AppComponent,
    NavbarComponent,
    FooterComponent,
    TestingPageComponent,
    TestingpagetwoComponent,
    TestingpagethreeComponent,
    CreateThreadComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ComponentsModule,
    ExamplesModule,
    AppRoutingModule,
<<<<<<< HEAD
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
    MatDialogModule
=======
    FullCalendarModule
>>>>>>> master
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateThreadComponent
  ]
})
export class AppModule { }