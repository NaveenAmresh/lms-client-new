import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PostUserService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  adduser(data: any) {
    const url = this.baseUrl + 'adduser/';
    return this.http.post(url, data);
  }
  updateuser(id, data: any) {
    const url = this.baseUrl + 'getuser/' + id;
    return this.http.put(url, data);
  }
}
