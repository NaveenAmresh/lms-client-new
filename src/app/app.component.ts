import { Component } from '@angular/core';
import {CheckconnService} from './components/services/checkconn.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public setTitle: CheckconnService, public titleService: Title) {
    this.setTitle.set()
      .subscribe(data => {
        this.titleService.setTitle(data['app_title']); localStorage.setItem('book_limit', data['book_limit']);
        localStorage.setItem('cr', data['cr_name']);
      });
}}
