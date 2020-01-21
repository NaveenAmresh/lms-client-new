import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {CheckconnService} from '../../../../services/checkconn.service';
import {SetupComponent} from '../setup.component';
import {ErrordialogueComponent} from '../../../../popup/errordialogue/errordialogue.component';
import {PostIssueService} from '../../../../services/post-issue.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-field3',
  templateUrl: './field3.component.html',
  styleUrls: ['./field3.component.sass']
})
export class Field3Component implements OnInit {
  SetupForm = this.fb.group({
    headerTitle: ['', Validators.required],
    loginTitle: ['', Validators.required],
    cr: ['', Validators.required],
    book_limit: ['', Validators.required],
    damaged_fine: ['', Validators.required],
    expired_fine: ['', Validators.required],
  });
  submit() {
    const form = new FormData();
    form.append('app_title', this.SetupForm.value.headerTitle);
    form.append('login_title', this.SetupForm.value.loginTitle);
    form.append('cr_name', this.SetupForm.value.cr);
    form.append('book_limit', this.SetupForm.value.book_limit);
    form.append('damaged_fine', this.SetupForm.value.damaged_fine);
    form.append('expired_fine', this.SetupForm.value.expired_fine);
    form.append('modified_by', '2');
    this.set.updateset(form)
      .subscribe((data) => {
        alert('Successfully Added');
        this.setup.app.titleService.setTitle(data['app_title']); localStorage.setItem('book_limit', data['book_limit']);
        localStorage.setItem('cr', data['cr_name']); this.setup.lay.cr = localStorage.getItem('cr');
      }); }
  constructor(public set: CheckconnService, private fb: FormBuilder, private setup: SetupComponent, public dialog: MatDialog) { }
  ngOnInit() {
    this.set.set()
      .subscribe(data => {
        this.SetupForm.patchValue({headerTitle: data['app_title'], loginTitle: data['login_title'], cr: data['cr_name'],
          book_limit: data['book_limit'], damaged_fine: data['damaged_fine'], expired_fine: data['expired_fine']});
      }, () => {const dialogRef = this.dialog.open(ErrordialogueComponent, {width: '600px', data: {head: 'Connection Failed !!',
      icon1: 'warning', content1: 'Internal Server Error... Please Check Later!', icon2: '', icon3: 'cancel', content2: 'Close',
      color: 'black', color1: 'red', color2: 'red', color3: 'red', tip: 'Close the dialogue'}, });
                dialogRef.afterClosed().subscribe(() => {window.location.reload(); }); });
  }
}
