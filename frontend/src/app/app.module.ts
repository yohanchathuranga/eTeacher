import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
import { TestingPageComponent } from './Pages/testing-page/testing-page.component';
import { TestingpagetwoComponent } from './Pages/testingpagetwo/testingpagetwo.component';
import { TestingpagethreeComponent } from './Pages/testingpagethree/testingpagethree.component';
import { MessagingPageComponent } from './Pages/messaging-page/messaging-page.component';
import { ChatPageComponent } from './Pages/chat-page/chat-page.component';
import { TestingUserPageComponent } from './Pages/testing-user-page/testing-user-page.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    TestingPageComponent,
    TestingpagetwoComponent,
    TestingpagethreeComponent,
    MessagingPageComponent,
    ChatPageComponent,
    TestingUserPageComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ComponentsModule,
    ExamplesModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
