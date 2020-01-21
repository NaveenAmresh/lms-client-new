import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PostIssueService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  postissue(data) {
    const url = this.baseUrl + 'addissue/';
    return this.http.post(url, data);
  }
  postissuebooks(data) {
    const url = this.baseUrl + 'addissuebooks/';
    return this.http.post(url, data);
  }
  updateissuebook(data) {
    const url = this.baseUrl + 'manageissuebooks/' + data['issue_book_id'];
    return this.http.put(url, data);
}
}
