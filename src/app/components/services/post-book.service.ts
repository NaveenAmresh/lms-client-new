import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PostBookService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  addbook(data: any) {
    const url = this.baseUrl + 'addbook/';
    return this.http.post(url, data);
  }
  updatebook(id, data: any) {
    const url = this.baseUrl + 'getbook/' + id;
    return this.http.put(url, data);
  }
  addcategory(data: any) {
    const url = this.baseUrl + 'addcats/';
    return this.http.post(url, data);
  }
  addpublisher(data: any) {
    const url = this.baseUrl + 'addpubs/';
    return this.http.post(url, data);
  }
  updatecategory(id, data: any) {
    const url = this.baseUrl + 'managecats/' + id;
    return this.http.put(url, data);
  }
  delcategory(id) {
    const url = this.baseUrl + 'managecats/' + id;
    return this.http.delete(url);
  }
  updatepublisher(id, data: any) {
    const url = this.baseUrl + 'managepubs/' + id;
    return this.http.put(url, data);
  }
  delpublisher(id) {
    const url = this.baseUrl + 'managepubs/' + id;
    return this.http.delete(url);
  }
}
