import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {RecruitmentsComponent} from './components/recruitments/recruitments.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {LoggedUserGuardService} from './services/logged-user-guard.service';
import {GuestGuardService} from './services/guest-guard.service';
import {RecruitmentsService} from './services/recruitments.service';
import {RequestInterceptor} from './interceptors/request.interceptor';
import {TodolistsComponent} from './components/todolists/todolists.component';
import {TodoListsService} from './services/todo-lists.service';
import {StoreModule} from '@ngrx/store';
import {recruitmentsReducer} from './store/reducers/recruitments.reducer';
import {todoListsReducer} from './store/reducers/todoLists.reducer';
import {AuthModule} from './modules/auth.module';
import {TodolistTaskComponent} from './components/todolists/todolist-task/todolist-task.component';
import {AngularMaterialModule} from './modules/material.module';

@NgModule({
	declarations: [
		AppComponent,
		SidenavComponent,
		RecruitmentsComponent,
		ToolbarComponent,
		TodolistsComponent,
		TodolistTaskComponent
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
		multi: true
	}],
	bootstrap: [AppComponent]
})
export class AppModule {
}
