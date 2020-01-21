import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListIssueService } from '../../services/list-issue.service';
import {DialogData} from '../../main/pages/issued-list/issued-list.component';
import {PostIssueService} from '../../services/post-issue.service';
import {ErrordialogueComponent} from '../errordialogue/errordialogue.component';
export interface IssuedBook {book: {isbn: number; book_title: string; publisher: {publisher: string; }; }; status: string; }
@Component({
  selector: 'app-bookslist',
  templateUrl: './bookslist.component.html',
  styleUrls: ['./bookslist.component.sass']
})
export class BookslistComponent implements OnInit {
  displayedColumns: string[] = ['index', 'isbn', 'book_title', 'publisher.publisher', 'status'];
  dataSource: MatTableDataSource<IssuedBook> = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator; @ViewChild(MatSort, {static: true}) sort: MatSort;
  sortingDataAccessor(item, property) {
    if (property.includes('.')) {
      return property.split('.')
        .reduce((object, key) => object[key], item); }
    return item[property];  }
  constructor(public dialogRef: MatDialogRef<BookslistComponent>, public _put: PostIssueService, public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: DialogData, public _get: ListIssueService) { }
  ngOnInit() { this._get.getIssuedbooks(this.data.id)
    .subscribe(data => {
      this.dataSource.data = data['results'] as []; this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
      this.dataSource.sort = this.sort; },
      () => {const dialogRef = this.dialog.open(ErrordialogueComponent, {width: '600px', data: {head: 'Connection Failed !!',
          icon1: 'warning', content1: 'Internal Server Error... Please Check Later!', icon2: '', icon3: 'cancel', content2: 'Close',
          color: 'black', color1: 'red', color2: 'red', color3: 'red', tip: 'Close the dialogue'}, });
             dialogRef.afterClosed().subscribe(() => {window.location.reload(); }); }); }
  submit(data:any = []) {
  for (const value of data) {
      this._put.updateissuebook(value)
        .subscribe(); }}
}
