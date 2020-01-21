import {BrowserModule, Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { MainModule } from './components/main/main.module';
import { ShareableModule } from './components/shareable.module';
import { MatProgressSpinnerModule } from '@angular/material';
@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MaterialModule, MainModule, ShareableModule, MatProgressSpinnerModule]
  , bootstrap: [AppComponent],
  providers: [Title]})
export class AppModule {}

