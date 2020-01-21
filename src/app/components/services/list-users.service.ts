import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ListUsersService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  public getState(data = 101) {
    const url = this.baseUrl + 'getstates/' + data;
    return this.http.get(url);
  }
  public getCity(data) {
    const url = this.baseUrl + 'getcities/' + data;
    return this.http.get(url);
  }
  public searchusers(url: any, data = '') {
    return this.http.get(url + data);
  }
  public user(id) {
    const url = this.baseUrl + 'getuser/' + id;
    return this.http.get(url);
  }
  public print(id) {
    const url = this.baseUrl + 'printuser/' + id;
    return this.http.get(url);
  }
}
