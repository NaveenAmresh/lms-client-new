import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {CanActivate, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ErrordialogueComponent} from '../popup/errordialogue/errordialogue.component';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate{
  constructor(public auth: AuthService, public router: Router, public dialog: MatDialog) { }
  canActivate(): boolean {
    this.auth.auth();
    if (localStorage.getItem('accessToken')) {
      this.dialog.open(ErrordialogueComponent, {
        width: '600px',
        data: {head: 'Session Active', icon1: 'account_circle', content1: 'The Current User is Actively Logged In', icon2: '',
          icon3: 'account_box', content2: 'OK', color: 'black', color1: 'green', color2: 'green', color3: 'red', tip: 'Close the dialogue'},
      });
      this.router.navigate(['panel/']);
      return false;
    }
    return true;
  }}
