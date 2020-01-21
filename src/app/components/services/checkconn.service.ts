import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ErrordialogueComponent} from '../popup/errordialogue/errordialogue.component';
import {MatDialog} from '@angular/material/dialog';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CheckconnService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, public dialog: MatDialog) {
  }
  public check() {
    return this.http.get(this.baseUrl)
      .subscribe(() => {
      },
        () => {
          const dialogRef = this.dialog.open(ErrordialogueComponent, {
            width: '600px',
            data: {name: 'Warning', icon: 'warning', content: 'Failed to Connect Server' },
          });
          dialogRef.afterClosed().subscribe(() => {
            window.location.reload();
          });
      });
  }
  public isbn(data) {
    const url = this.baseUrl + 'check/' + data + '/0/0';
    return this.http.get(url);
  }
  public mobile(data) {
    const url = this.baseUrl + 'check/0/' + data + '/0';
    return this.http.get(url);
  }
  public email(data) {
    const url = this.baseUrl + 'check/0/0/' + data;
    return this.http.get(url);
  }
  public set() {
    const url = this.baseUrl + 'general/' + 1;
    return this.http.get(url);
  }
  public updateset(data) {
    console.log(data);
    const headerDict = {
      Authorization: 'Bearer ' + localStorage.getItem('accessToken')
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    const url = this.baseUrl + 'general/' + 1;
    return this.http.put(url, requestOptions, data);
  }
}
