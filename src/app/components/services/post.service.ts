import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PostUserService {
  baseUrl = environment.baseUrl;
  url = this.baseUrl + 'token/obtain/';
  constructor(private http: HttpClient) { }
  login(data: any) {
    return this.http.post(this.url, data);
  }
}
