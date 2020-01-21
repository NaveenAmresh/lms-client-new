import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ListBooksService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  public listcats() {
    const url = this.baseUrl + 'catslist/';
    return this.http.get(url);
  }
  public listpub() {
    const url = this.baseUrl + 'publishlist/';
    return this.http.get(url);
  }
  public searchbooks(url: any, data = '') {
    return this.http.get(url + data);
  }
  public book(id) {
    const url = this.baseUrl + 'getbook/' + id;
    return this.http.get(url);
  }
}
