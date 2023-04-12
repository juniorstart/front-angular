import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from "@angular/material/toolbar"
import {MatSidenavModule} from "@angular/material/sidenav"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { RegisterComponent } from './register/register.component';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import { RecruitmentsComponent } from './recruitments/recruitments.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {LoggedUserGuardService} from './services/logged-user-guard.service';
import {GuestGuardService} from './services/guest-guard.service';
import {MatCardModule} from '@angular/material/card';
import {RecruitmentsService} from './services/recruitments.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {RequestInterceptor} from './interceptors/request.interceptor';
import {MatExpansionModule} from '@angular/material/expansion';
import { TodolistsComponent } from './todolists/todolists.component';
import {TodoListsService} from './services/todo-lists.service';
import {MatSelectModule} from '@angular/material/select';
import { StoreModule } from '@ngrx/store';
import {recruitmentsReducer} from './store/reducers/recruitments.reducer';

@NgModule({
  declarations: [
    RegisterComponent,
    AppComponent,
    LoginComponent,
    SidenavComponent,
    RecruitmentsComponent,
    ToolbarComponent,
    TodolistsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatSelectModule,
    MatExpansionModule,
    StoreModule.forRoot({recruitments: recruitmentsReducer}, {})
  ],
  providers: [AuthService, LoggedUserGuardService, GuestGuardService, RecruitmentsService, TodoListsService, {
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
