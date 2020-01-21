import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PostDuesService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  addFine(data: any) {
    const url = this.baseUrl + 'addfine/';
    return this.http.post(url, data);
  }
  updateFine(data: any, id) {
    const url = this.baseUrl + 'managefine/' + id;
    return this.http.put(url, data);
  }
}
