import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './startpage/home/home.component';
import { LoginComponent } from './startpage/login/login.component';
import { RegisterComponent } from './startpage/register/register.component';
import { StartModule } from './startpage/start.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardModule } from './dashboard/dashboard.module';
import { HttpInterceptorModule } from './htt-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpInterceptorModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    StartModule,
    AppRoutingModule,
    DashboardModule,
    SharedModule,
    BrowserAnimationsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
