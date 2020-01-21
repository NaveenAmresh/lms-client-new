import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {ErrordialogueComponent} from '../../../popup/errordialogue/errordialogue.component';
import {ListUsersService} from '../../../services/list-users.service';
// import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import {DatePipe} from '@angular/common';
export interface UserRow {user_id: number; firstname: string; lastname: string; mobile: string; email: string; added_on: string;
added_by: string; status: string; }
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']})
export class UserListComponent implements OnInit {  f1: string = 'A'; f2: any = ''; f3: any = ''; loading: boolean = true;
  // print: ExportAsConfig = {type: 'pdf', elementId: 'table'}; text: ExportAsConfig = {type: 'doc', elementId: 'table'};
  // csv: ExportAsConfig = {type: 'csv', elementId: 'table'}; excel: ExportAsConfig = {type: 'xls', elementId: 'table'};
  displayedColumns: string[] = ['name', 'phone', 'email', 'added_on', 'added_by', 'status', 'action'];
  dataSource: MatTableDataSource<UserRow> = new MatTableDataSource(); private pagesize: number[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  sortingDataAccessor(item, property) {
    if (property.includes('.')) {
      return property.split('.')
        .reduce((object, key) => object[key], item); }
    return item[property]; }
  searchUsers(page, pageSize = 10, search = '', f1 = this.f1, f2 = this.datePipe.transform(this.f2, 'yyyy-MM-dd') || '',
              f3 = this.datePipe.transform(this.f3, 'yyyy-MM-dd') || '') {
    this._get.searchusers('http://127.0.0.1:8000/api/userssearch/?page=' + page + '&page_size=' + pageSize + '&search=' + search
      + '&status=' + f1 + '&added_on=' + f2)
      .subscribe(data => { this.paginator.pageSize = pageSize; this.loading = false;
                           this.dataSource.data = data['results'] as []; this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
                           this.paginator.length = data['count']; this.dataSource.sort = this.sort; this.pagesize = [5, 10, 25, 50, 100]; },
        () => {const dialogRef = this.dialog.open(ErrordialogueComponent, {width: '600px', data: {head: 'Connection Failed !!',
            icon1: 'warning', content1: 'Internal Server Error... Please Check Later!', icon2: '', icon3: 'cancel', content2: 'Close',
            color: 'black', color1: 'red', color2: 'red', color3: 'red', tip: 'Close the dialogue'}, });
               dialogRef.afterClosed().subscribe(() => {window.location.reload(); }); }); }
  constructor(private datePipe: DatePipe, public dialog: MatDialog, private _get: ListUsersService,
              // private exportAsService: ExportAsService
  ) {}  ngOnInit() { this.searchUsers(1); }
  table(search, value) { this.searchUsers(value.pageIndex + 1, value.pageSize, search); console.log(value); }
  applyFilter(filterValue: any) {this.searchUsers(1, 10, filterValue);
                                 if (this.paginator) {this.paginator.firstPage(); }}
  // print_f() {this.exportAsService.save(this.print, 'BookList'); }  text_f() {this.exportAsService.save(this.text, 'UserList'); }
  // csv_f() {this.exportAsService.save(this.csv, 'BookList'); }  excel_f() {this.exportAsService.save(this.excel, 'UserList'); }
}


