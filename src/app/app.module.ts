import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from "@angular/material/toolbar"
import {MatSidenavModule} from "@angular/material/sidenav"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { RegisterComponent } from './components/register/register.component';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import { RecruitmentsComponent } from './components/recruitments/recruitments.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {LoggedUserGuardService} from './services/logged-user-guard.service';
import {GuestGuardService} from './services/guest-guard.service';
import {MatCardModule} from '@angular/material/card';
import {RecruitmentsService} from './services/recruitments.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {RequestInterceptor} from './interceptors/request.interceptor';
import {MatExpansionModule} from '@angular/material/expansion';
import { TodolistsComponent } from './components/todolists/todolists.component';
import {TodoListsService} from './services/todo-lists.service';
import {MatSelectModule} from '@angular/material/select';
import { StoreModule } from '@ngrx/store';
import {recruitmentsReducer} from './store/reducers/recruitments.reducer';
import {todoListsReducer} from './store/reducers/todoLists.reducer';
import {AngularMaterialModule} from './modules/material.module';
import {AuthModule} from './modules/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    RecruitmentsComponent,
    ToolbarComponent,
    TodolistsComponent,
  ],
  imports: [
    AngularMaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule,
    StoreModule.forRoot({recruitments: recruitmentsReducer, todoLists: todoListsReducer}, {})
  ],
  providers: [AuthService, LoggedUserGuardService, GuestGuardService, RecruitmentsService, TodoListsService, {
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
