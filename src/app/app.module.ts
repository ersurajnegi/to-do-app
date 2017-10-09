import { AuthGuardService } from './auth-guard.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'ng2-materialize';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { ApiService } from './api.service';
import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';
import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { DeleteComponent } from './components/delete/delete.component';
import { LoginComponent } from './components/login/login.component';
import { LoaderComponent } from './components/loader/loader.component';
import { routes } from './app.routes';


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
    DeleteComponent,
    LoginComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MaterializeModule.forRoot(),
    routes,
    FormsModule
  ],
  providers: [ApiService, LoginService,UserService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
