import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {
  title: string = 'Settings';
  color1: any = 'red';
  color2: any = 'blue';
  settingsForm = this.fb.group({
    bgcolor: [this.color1, Validators.required],
    textcolor: [this.color2, Validators.required],
    formtype: ['', Validators.required],
    layouttype: ['', Validators.required],
    sidebarstart: ['', Validators.required],
    indicator: ['', Validators.required],
  });
  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    console.log(decodeURIComponent('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTYzMjE2MjAwLCJqdGkiOiJjYWRmODdlOTEzZDE0MTZiOTQ3YTQ3NzYwZGI2MzA2MyIsInVzZXJfaWQiOjJ9.XRb4qFDzMECZJI7PX5R1MbUHYqMAyl4Ip2xyzbsh7_I'));
  }
  submit() {
    const form = new FormData();
    form.append('bgcolor', this.settingsForm.value.bgcolor);
    form.append('textcolor', this.settingsForm.value.textcolor);
    form.append('formtype', this.settingsForm.value.formtype);
    form.append('layouttype', this.settingsForm.value.layouttype);
    form.append('sidebarstart', this.settingsForm.value.sidebarstart);
    form.append('indicator', this.settingsForm.value.indicator);
  }
}
