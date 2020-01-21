import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ListReminderService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  getReminder(data) {
    return this.http.get(this.baseUrl + 'reminderslist?page=' + data);
  }
}
