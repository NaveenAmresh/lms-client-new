import {Component, Inject, OnInit} from '@angular/core';
import { SetupComponent } from '../setup.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogTitle} from '@angular/material';
import {DialogData} from '../../issued-list/issued-list.component';
import {LayoutComponent} from '../../../layout/layout.component';
import {AppComponent} from '../../../../../app.component';
import {ErrordialogueComponent} from '../../../../popup/errordialogue/errordialogue.component';
import {PostIssueService} from '../../../../services/post-issue.service';
@Component({
  selector: 'app-field1',
  templateUrl: './field1.component.html',
  styleUrls: ['./field1.component.sass'],
  providers: [SetupComponent, LayoutComponent, AppComponent, { provide: MatDialogTitle, useValue: {} }, { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] } ]
})
export class Field1Component implements OnInit {
  private cats: Object;
  add1(data) {
    this.setup.fb.append('category', data);
    this.setup._post.addcategory(this.setup.fb)
      .subscribe(() => {
        this.setup._snackBar.open('Successfully Added', 'close', {duration: 5000, panelClass: ['success']});
        this.ngOnInit();
      }, () => {
        this.setup._snackBar.open('Oops! Something Went Wrong', 'close', {duration: 5000, panelClass: ['error']});
      });
  }
  up1(id, data) {
    this.setup.fb.append('category', data);
    this.setup._post.updatecategory(id, this.setup.fb)
      .subscribe(() => {
        this.setup._snackBar.open('Successfully Added', 'close', {duration: 5000, panelClass: ['success']});
        this.ngOnInit();
      }, () => {
        this.setup._snackBar.open('Oops! Something Went Wrong', 'close', {duration: 5000, panelClass: ['error']});
      });
  }
  constructor(private setup: SetupComponent, public dialogRef: MatDialogRef<Field1Component>, public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
    this.setup._get.listcats().subscribe((data) => {
      this.cats = data;
    }, () => {this.cats = [{ category_id: 0, category: 'Not Available', status: 'A' }]; }); }
  d1(e, id) {
    e.stopPropagation();
    this.setup._post.delcategory(id)
      .subscribe(() => {
        this.setup._snackBar.open('Successfully Deleted', 'close', {duration: 5000, panelClass: ['success']});
        this.ngOnInit();
      }, () => {
        this.setup._snackBar.open('Oops! Something Went Wrong -(OR)- This Category Might Be Used In Somewhere ? Please Change It', 'Close',
          {duration: 5000, panelClass: ['error']});
      });
  }
}
