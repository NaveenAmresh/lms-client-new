import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {ErrordialogueComponent} from '../popup/errordialogue/errordialogue.component';
import {MatDialog} from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router, public dialog: MatDialog) { }
canActivate(): boolean {
  this.auth.auth();
  if (!localStorage.getItem('accessToken')) {
    const dialogRef = this.dialog.open(ErrordialogueComponent, {
      width: '600px',
      data: {head: 'TimedOut!', icon1: 'assignment_late', content1: 'Session Expired! Logged Out', icon2: '',
        icon3: '', content2: 'OK', color: 'black', color1: 'purple', color2: 'purple', color3: 'red', tip: 'Close the dialogue'},
    });
    this.router.navigate(['/login']);
    return false;
  }
  return true;
}}
