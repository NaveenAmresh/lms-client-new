import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListBooksService } from '../../../services/list-books.service';
import { ErrordialogueComponent } from '../../../popup/errordialogue/errordialogue.component';
// import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import {PostBookService} from '../../../services/post-book.service';
export interface BookRow {isbn: number; book_title: string; category: {category: string; }; publisher: {publisher: string; };
quantity: number; status: string; }
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.sass']})
export class BookListComponent implements OnInit { f1: string = 'A';
  // print: ExportAsConfig = {type: 'pdf', elementId: 'table'}; text: ExportAsConfig = {type: 'doc', elementId: 'table'};
  // csv: ExportAsConfig = {type: 'csv', elementId: 'table'}; excel: ExportAsConfig = {type: 'xls', elementId: 'table'};
  displayedColumns: string[] = ['index', 'isbn', 'book_title', 'publisher.publisher', 'quantity', 'status', 'action'];
  dataSource: MatTableDataSource<BookRow> = new MatTableDataSource(); private pagesize: number[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;  @ViewChild(MatSort, {static: true}) sort: MatSort;
  loading: boolean = true;
  sortingDataAccessor(item, property) {
    if (property.includes('.')) {
      return property.split('.')
        .reduce((object, key) => object[key], item); }
    return item[property];  }
  public searchBooks(page, pageSize = 10, search = '', f1 = this.f1) {
    this._get.searchbooks('http://127.0.0.1:8000/api/bookssearch/?page=' + page + '&page_size=' + pageSize + '&search=' + search
      + '&status=' + f1)
      .subscribe(data => { this.paginator.pageSize = pageSize;  this.loading = false;
                           this.dataSource.data = data['results'] as []; this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
                           this.paginator.length = data['count']; this.dataSource.sort = this.sort; this.pagesize = [5, 10, 25, 50, 100]; },
        () => {const dialogRef = this.dialog.open(ErrordialogueComponent, {width: '600px', data: {head: 'Connection Failed !!',
            icon1: 'warning', content1: 'Internal Server Error... Please Check Later!', icon2: '', icon3: 'cancel', content2: 'Close',
            color: 'black', color1: 'red', color2: 'red', color3: 'red', tip: 'Close the dialogue'}, });
               dialogRef.afterClosed().subscribe(() => {window.location.reload(); }); }); }
  constructor(public dialog: MatDialog, private _get: ListBooksService,
              // private exportAsService: ExportAsService,
              private _put: PostBookService ) { }
  table(search, value) { this.searchBooks(value.pageIndex + 1, value.pageSize); }
  ngOnInit() { this.searchBooks(1); }
  disable(id, data) { this._put.updatebook(id, data).subscribe(); }
  applyFilter(filterValue: any) {this.searchBooks(1, 10, filterValue);
                                 if (this.dataSource.paginator) {this.dataSource.paginator.firstPage(); }}
  // print_f() {this.exportAsService.save(this.print, 'BookList'); }  text_f() {this.exportAsService.save(this.text, 'BookList'); }
  // csv_f() {this.exportAsService.save(this.csv, 'BookList'); }  excel_f() {this.exportAsService.save(this.excel, 'BookList'); }
}
