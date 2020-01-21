import {Component, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {ListBooksService} from '../../../services/list-books.service';
import {ErrordialogueComponent} from '../../../popup/errordialogue/errordialogue.component';
import {BookRow} from '../book-list/book-list.component';
import {ListUsersService} from '../../../services/list-users.service';
import {PostIssueService} from '../../../services/post-issue.service';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-issuebook',
  templateUrl: './issuebook.component.html',
  styleUrls: ['./issuebook.component.sass']})
export class IssuebookComponent implements OnInit {
  displayedColumns1: string[] = ['index', 'firstname', 'mobile', 'email', 'select'];
  dataSource1: MatTableDataSource<UserRow> = new MatTableDataSource();
  selection1 = new SelectionModel<UserRow>(false, []);
  displayedColumns2 = ['index', 'isbn', 'book_title', 'category.category', 'publisher.publisher', 'quantity', 'select'];
  dataSource2: MatTableDataSource<BookRow> = new MatTableDataSource();
  selection2 = new SelectionModel<BookRow>(true, []);
  @ViewChild('sort1', { static: true }) sort1: MatSort;
  @ViewChild('sort2', { static: true }) sort2: MatSort;
  private header: string = '';  private head: string = '';  private values: any = []; date_limit: any; selectId: number = null;
  table1: boolean = true; table2: boolean = true;  private next1: any = null;  private next2: any = null;  private scroll: number = 0;
  private scrol2: number = 0; private cache1: any;  private cache2: any; step = 0; books: any = [];  book: any = [];
  booklimit: any = localStorage.getItem('book_limit'); count = this.booklimit;
  date: Date; curdate: Date = new Date();
  loading1: boolean = false; loading2: boolean = false;
  sortingDataAccessor(item, property) {
    if (property.includes('.')) {
      return property.split('.')
        .reduce((object, key) => object[key], item);
    }
    return item[property];
  }
  scroll1(e) {
    this.loading1 = this.next1 !== null;
    if (e.target.scrollTop === 0) {
      this.scroll = 0; }
    const tableScrollHeight = e.target.scrollHeight;
    const tableViewHeight = e.target.offsetHeight;
    const scrollLocation = e.target.scrollTop;
    if (tableScrollHeight - scrollLocation === tableViewHeight && this.next1 !== null) {
      this._get1.searchusers(this.next1)
        .subscribe(data => {
          const temp = data['results']; this.loading1 = false;
          for (const value of temp) {
            this.dataSource1.data.push(value);
          }
          this.dataSource1.sortingDataAccessor = this.sortingDataAccessor;
          this.dataSource1.sort = this.sort1;
          this.next1 = data['next'];
          },
          () => { this.loading1 = false;  const dialogRef = this.dialog.open(ErrordialogueComponent, {
              width: '600px',
              data: {name: 'Warning', icon: 'warning', content: 'Failed to Connect Server' },
            });
                  dialogRef.afterClosed().subscribe(() => {
              window.location.reload();
            });
          });
      this.scroll = e.target.scrollTop;
    }
  }
  scroll2(e) {
    this.loading2 = this.next1 !== null;
    if (e.target.scrollTop === 0) {
      this.scrol2 = 0; }
    const tableScrollHeight = e.target.scrollHeight;
    const tableViewHeight = e.target.offsetHeight;
    const scrollLocation = e.target.scrollTop;
    if (tableScrollHeight - scrollLocation === tableViewHeight && this.next2 !== null) {
      this._get2.searchbooks(this.next2)
        .subscribe(data => {
          const temp = data['results']; this.loading2 = false;
          for (const value of temp) {
            this.dataSource2.data.push(value);
          }
          this.dataSource2.sortingDataAccessor = this.sortingDataAccessor;
          this.dataSource2.sort = this.sort1;
          this.next2 = data['next'];
          },
          () => { this.loading2 = false; const dialogRef = this.dialog.open(ErrordialogueComponent, {
              width: '600px',
              data: {name: 'Warning', icon: 'warning', content: 'Failed to Connect Server' },
            });
                  dialogRef.afterClosed().subscribe(() => {
              window.location.reload();
            });
          });
      this.scrol2 = e.target.scrollTop;
    }
  }
  applyFilter1(filterValue: any) { this.loading1 = true;
    if (filterValue === '') {
      this.dataSource1.data = [];
      this.table1 = true; this.loading1 = false;
      return;
    }
    const url1 = 'http://127.0.0.1:8000/api/userssearch/?status=A&search=';
    this.table1 = false;
    this.cache1 = filterValue;
    this._get1.searchusers(url1, filterValue)
      .subscribe(data => {
        this.dataSource1.data = data['results'] as [];
        this.dataSource1.sortingDataAccessor = this.sortingDataAccessor;
        this.dataSource1.sort = this.sort1;
        this.next1 = data['next']; this.loading1 = false;
        },
        () => {
          const dialogRef = this.dialog.open(ErrordialogueComponent, {
            width: '600px',
            data: {name: 'Warning', icon: 'warning', content: 'Failed to Connect Server' },
          }); this.loading1 = false;
          dialogRef.afterClosed().subscribe(() => {
            window.location.reload();
          });
        });
  }
  applyFilter2(filterValue: any) { this.loading2 = true;
    if (filterValue === '') {
      this.dataSource2.data = [];
      this.table2 = true; this.loading2 = false;
      return;
    }
    const url2 = 'http://127.0.0.1:8000/api/bookssearch/?status=A&search=';
    this.cache2 = filterValue;
    this.table2 = false;
    this._get2.searchbooks(url2, filterValue)
      .subscribe(data => {
        this.dataSource2.data = data['results'] as [];
        this.dataSource2.sortingDataAccessor = this.sortingDataAccessor;
        this.dataSource2.sort = this.sort2;
        this.next2 = data['next']; this.loading2 = false;
        },
        () => {
          const dialogRef = this.dialog.open(ErrordialogueComponent, {
            width: '600px',
            data: {name: 'Warning', icon: 'warning', content: 'Failed to Connect Server' },
          }); this.loading2 = false;
          dialogRef.afterClosed().subscribe(() => {
            window.location.reload();
          });
        });
  }
  isAllSelected1() {
    const numSelected = this.selection1.selected.length;
    const numRows = this.dataSource1.data.length;
    return numSelected === numRows;
  }
  checkboxLabel1(row?: UserRow): string {
    if (!row) {
      return `${this.isAllSelected1() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection1.isSelected(row) ? 'deselect' : 'select'} row ${row.mobile + 1}`;
  }
  isAllSelected2() {
    const numSelected = this.selection2.selected.length;
    const numRows = this.dataSource2.data.length;
    return numSelected === numRows;
  }
  checkboxLabel2(row?: BookRow): string {
    if (!row) {
      return `${this.isAllSelected2() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection2.isSelected(row) ? 'deselect' : 'select'} row ${row.isbn + 1}`;
  }
  constructor(private datePipe: DatePipe, public dialog: MatDialog, public _post: PostIssueService ,
              private _get1: ListUsersService, private _get2: ListBooksService) {
  }
  ngOnInit() {
    this.date = new Date(); this.date.setDate( this.date.getDate() + 3 ); this.date_limit = this.date;
    this.dataSource1.sort = this.sort1; this.dataSource2.sort = this.sort2;
  }
  setHead(name1, name2) {
    if (this.header === name1 + ' ' + name2) {
      this.header = '';
    } else {
      this.header = name1 + ' ' + name2;
    }
  }
  selectRow(value: any) {
    this.book.push(value);
    if (this.values.includes(value.book_id) === true) {
      const index = this.values.indexOf(value.book_id);
      this.values.splice(index, 1);
      this.books.splice(index, 1);
    } else {
      this.values.push(value.book_id);
      this.books.push(value.book_title);
    }
  }
  issue() {
    const limit = this.datePipe.transform(this.date_limit, 'yyyy-MM-dd');
    const id: any = this.selectId; const books = this.values; const issue = new FormData(); let status: any;
    issue.append('user', id);
    issue.append('issued_by', 'Admin');
    issue.append('issued_limit', limit);
    this._post.postissue(issue)
      .subscribe(data => {
        for (const book of books) {
          const issueBook = new FormData();
          issueBook.append('issue', data['issue_id']);
          issueBook.append('book', book);
          this._post.postissuebooks(issueBook)
            .subscribe(() => {
              status = true;
            }, () => {
              status = false;
            }); }
        status === true ? alert('Oops! Something Went Wrong') : alert('Successfully Added');
      }, () => {
        alert('Oops! Something Went Wrong');
      });
  }
}
export interface BookRow {
  book_id: number; isbn: number; book_title: string; category: { category: string; }; publisher: { publisher: string; }; quantity: number; }
export interface UserRow {
  user_id: number;  firstname: string;  lastname: string;  mobile: string;  email: string; count: number; }
