import { Component, OnInit } from '@angular/core';
import {SetupComponent} from '../setup.component';
import {MatDialog} from '@angular/material';
@Component({
  selector: 'app-field2',
  templateUrl: './field2.component.html',
  styleUrls: ['./field2.component.sass']
})
export class Field2Component implements OnInit {
  private pubs: Object;
  add2(data) {
    this.setup.fb.append('publisher', data);
    this.setup._post.addpublisher(this.setup.fb)
      .subscribe(() => {
        this.setup._snackBar.open('Successfully Added', 'close', {duration: 5000, panelClass: ['success']});
        this.ngOnInit();
      }, () => {
        this.setup._snackBar.open('Oops! Something Went Wrong', 'close', {duration: 5000, panelClass: ['error']});
      });
  }
  up2(id, data) {
    this.setup.fb.append('publisher', data);
    this.setup._post.updatepublisher(id, this.setup.fb)
      .subscribe(() => {
        this.setup._snackBar.open('Successfully Added', 'close', {duration: 5000, panelClass: ['success']});
        this.ngOnInit();
      }, () => {
        this.setup._snackBar.open('Oops! Something Went Wrong', 'close', {duration: 5000, panelClass: ['error']});
      });
  }
  d2(e, id) {
    e.stopPropagation();
    this.setup._post.delpublisher(id)
      .subscribe(() => {
        this.setup._snackBar.open('Successfully Deleted', 'close', {duration: 5000, panelClass: ['success']});
        this.ngOnInit();
      }, () => {
        this.setup._snackBar.open('Oops! Something Went Wrong', '', {duration: 5000, panelClass: ['error']});
      });
  }
  constructor(private setup: SetupComponent, public dialog: MatDialog) { }
  ngOnInit() {
    this.setup._get.listpub().subscribe((data) => {
      this.pubs = data;
    }, () => {this.pubs = [{ publisher_id: 0, publisher: 'Not Available', status: 'A' }]; });
  }
}
