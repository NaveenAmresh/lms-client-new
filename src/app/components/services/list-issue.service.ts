import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ListIssueService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  getIssued(data) {
    return this.http.get(this.baseUrl + 'issue/?page=' + data);
  }
  getIssuedbooks(data) {
    return this.http.get(this.baseUrl + 'issuebooks/?search=' + data);
  }
}
