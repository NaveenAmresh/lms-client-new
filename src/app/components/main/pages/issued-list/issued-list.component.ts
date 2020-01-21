import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListIssueService } from '../../../services/list-issue.service';
import { ErrordialogueComponent } from '../../../popup/errordialogue/errordialogue.component';
// import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { BookslistComponent } from '../../../popup/bookslist/bookslist.component';
import {DatePipe} from '@angular/common';
export interface IssuedRow {issue_id: number; user: {firstname: string, lastname: string; mobile: number; email: string }; is_book: string;
issued_by: string; issued_on: string; issued_limit: string; }
export interface DialogData { id: number; }
@Component({
  selector: 'app-issued-list',
  templateUrl: './issued-list.component.html',
  styleUrls: ['./issued-list.component.sass']})
export class IssuedListComponent implements OnInit { f3: any = '';
  // print: ExportAsConfig = {type: 'pdf', elementId: 'table'}; text: ExportAsConfig = {type: 'doc', elementId: 'table'};
  // csv: ExportAsConfig = {type: 'csv', elementId: 'table'}; excel: ExportAsConfig = {type: 'xls', elementId: 'table'};
  displayedColumns: string[] = ['index', 'user', 'mobile', 'email', 'issued_by', 'issued_on', 'issued_limit', 'status', 'action'];
  dataSource: MatTableDataSource<IssuedRow> = new MatTableDataSource(); private pagesize: number[]; loading: boolean = true; f2: any = '';
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;  @ViewChild(MatSort, {static: true})sort: MatSort; f1: string = 'A';
  sortingDataAccessor(item, property) {
    if (property.includes('.')) {
      return property.split('.')
        .reduce((object, key) => object[key], item); }
    return item[property];  }
  searchBooks(page, pageSize = 10, search = '', f1 = this.f1, f2 = this.datePipe.transform(this.f2, 'yyyy-MM-dd') || '',
              f3 = this.datePipe.transform(this.f3, 'yyyy-MM-dd') || '') { this._get.getIssued(page
    + '&page_size=' + pageSize + '&search=' + search + '&is_book=' + f1 + '&issued_on=' + f2 + '&issued_limit=' + f3)
      .subscribe(data => { this.paginator.pageSize = pageSize; this.loading = false;
                           this.dataSource.data = data['results'] as []; this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
                           this.paginator.length = data['count']; this.dataSource.sort = this.sort; this.pagesize = [5, 10, 25, 50, 100]; },
        () => {const dialogRef = this.dialog.open(ErrordialogueComponent, {width: '600px', data: {head: 'Connection Failed !!',
            icon1: 'warning', content1: 'Internal Server Error... Please Check Later!', icon2: '', icon3: 'cancel', content2: 'Close',
            color: 'black', color1: 'red', color2: 'red', color3: 'red', tip: 'Close the dialogue'}, });
               dialogRef.afterClosed().subscribe(() => {window.location.reload(); }); }); }
  applyFilter(filterValue: any) {this.searchBooks(1, 10, filterValue);
                                 if (this.dataSource.paginator) {this.dataSource.paginator.firstPage(); }}
  issuedBooks(data) {const dialogRef = this.dialog.open(BookslistComponent, {width: '75%', data: { id: data }});
                     dialogRef.afterClosed().subscribe(() => { this.searchBooks(1); });  }
  constructor(private datePipe: DatePipe, public dialog: MatDialog, public _get: ListIssueService,
              // public exportAsService: ExportAsService
  ) {} ngOnInit() { this.searchBooks(1); }
  // print_f() {this.exportAsService.save(this.print, 'IssuedList'); }  text_f() {this.exportAsService.save(this.text, 'IssuedList'); }
  // csv_f() {this.exportAsService.save(this.csv, 'IssuedList'); }  excel_f() {this.exportAsService.save(this.excel, 'IssuedList'); }
}
