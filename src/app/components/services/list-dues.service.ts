import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ListDuesService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  getdues(data) {
    return this.http.get(this.baseUrl + 'duelist?page=' + data);
  }
}
