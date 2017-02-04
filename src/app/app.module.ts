import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { 
  AngularFireModule, 
  AuthMethods, 
  AuthProviders 
} from "angularfire2";

import {ApiService} from './api.service';
import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { LoaderComponent } from './components/loader/loader.component';

const firebaseConfig = {
  apiKey: "AIzaSyB5R-7qXKQ6Iy-7CxWf6TVQzxMzX3_j9ss",
    authDomain: "tutorapps.firebaseapp.com",
    databaseURL: "https://tutorapps.firebaseio.com",
    storageBucket: "firebase-tutorapps.appspot.com",
    messagingSenderId: "1046096271852"
};


@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    AddEditComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
