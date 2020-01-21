import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PostDuesService} from '../../../services/post-dues.service';
import {ListDuesService} from '../../../services/list-dues.service';
import {ErrordialogueComponent} from '../../../popup/errordialogue/errordialogue.component';
import {DatePipe} from '@angular/common';
export interface DueRow {fine_id: number; fine_amount: number; fine_paid: number; fined_by: string; fined_on: any; paid_on: any; fine_status: string;
reminder: {fine_type: string; issue: {issued_on: string; issued_by: string; issued_limit: string; user: {firstname: string;
lastname: string; mobile: number; }} ; issue_book: {book: {isbn: number; book_title: string; }}}; }
@Component({
  selector: 'app-dues',
  templateUrl: './dues.component.html',
  styleUrls: ['./dues.component.sass']
})
export class DuesComponent implements OnInit {
  displayedColumns: string[] = ['index', 'user', 'mobile', 'book', 'isbn', 'fType', 'issued_by', 'issued_on', 'issued_limit', 'fined_by',
    'fined_on', 'fine_amount', 'action', 'paid_on']; myDate = new Date();
  dataSource: MatTableDataSource<DueRow> = new MatTableDataSource(); private pagesize: number[]; loading: boolean = true; f1 = 'A';
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;  @ViewChild(MatSort, {static: true})sort: MatSort;
  sortingDataAccessor(item, property) {
    if (property.includes('.')) {
      return property.split('.')
        .reduce((object, key) => object[key], item); }
    return item[property];  }
  table(value) { this.ngOnInit(value.pageIndex + 1, value.pageSize); }
  constructor(private datePipe: DatePipe, public dialog: MatDialog, public _get: ListDuesService, public _post: PostDuesService) { }
  ngOnInit(page = 1, pageSize = 10) {this._get.getdues(page + '&page_size=' +  pageSize + '&fine_status=' + this.f1)
    .subscribe(data => { this.paginator.pageSize = pageSize; this.loading = false;
                         this.dataSource.data = data['results'] as [];
                         this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
                         this.paginator.length = data['count']; this.dataSource.sort = this.sort; this.pagesize = [5, 10, 25, 50, 100]; },
      () => {
        this.loading = false; const dialogRef = this.dialog.open(ErrordialogueComponent, {
          width: '600px', data: {name: 'Warning', icon: 'warning', content: 'Failed to Connect Server'}, });
        dialogRef.afterClosed().subscribe(() => { window.location.reload(); }); }); }
  submit(e, data, id) {
    e.stopPropagation();
    this._post.updateFine(data, id)
      .subscribe(() => {
        alert('Successfully Added');
        this.ngOnInit();
      });
  }
}
