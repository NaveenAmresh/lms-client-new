import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {ErrordialogueComponent} from '../popup/errordialogue/errordialogue.component';
import {MatDialog} from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, public dialog: MatDialog) { }
  public auth(): any {
    if (localStorage.getItem('accessToken') || localStorage.getItem('refreshToken') ) {
      if (!localStorage.getItem('accessToken')) {
        const refresh = localStorage.getItem('refreshToken'); const form2 = new FormData(); form2.append('refresh', refresh);
        this.http.post(this.baseUrl + 'token/refresh/', form2).toPromise()
          .then(data => {
            localStorage.setItem('accessToken', data['access']);
          }, err2 => {
            if (err2.statusText === 'Unauthorized') {
              localStorage.removeItem('refreshToken');
            }});
      } else {
        const token = localStorage.getItem('accessToken'); const refresh = localStorage.getItem('refreshToken');
        const form1 = new FormData(); const form2 = new FormData(); form1.append('token', token); form2.append('refresh', refresh);
        return this.http.post(this.baseUrl + 'token/verify/', form1).toPromise()
          .then(() => {
            return;
          }, err1 => {
            if (err1.statusText === 'Unauthorized') {
              this.http.post(this.baseUrl + 'token/refresh/', form2).toPromise()
                .then(data => {
                  localStorage.setItem('accessToken', data['access']);
                }, err2 => {
                  if (err2.statusText === 'Unauthorized') {
                    localStorage.removeItem('accessToken'); localStorage.removeItem('refreshToken');
                  }});
            } else {
              const dialogRef = this.dialog.open(ErrordialogueComponent, {
                width: '600px',
                data: {head: 'Connection Failed !!', icon1: 'warning', content1: 'Internal Server Error... Please Check Later!',
                  icon2: '', icon3: 'cancel', content2: 'Close', color: 'black', color1: 'red', color2: 'red', color3: 'red',
                  tip: 'Close the dialogue'},
              });
              dialogRef.afterClosed().subscribe(() => {
                window.location.reload();
              });
          }});
      }}
  }
}
