import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ListReminderService} from '../../../services/list-reminder.service';
import {ErrordialogueComponent} from '../../../popup/errordialogue/errordialogue.component';
import {PostDuesService} from '../../../services/post-dues.service';
export interface ReminderRow {reminder_id: number; issue: { user: {firstname: string, lastname: string; mobile: number; email: string };
issued_by: string; issued_on: string; issued_limit: string; }; issue_book: {book: {book_title: string, isbn: number}}; fine_type: string;
status: string; fine_amount: any; }
@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.sass']
})
export class ReminderComponent implements OnInit {
  displayedColumns: string[] = ['index', 'user', 'mobile', 'book', 'isbn', 'fType', 'issued_by', 'issued_on', 'issued_limit', 'action'];
  dataSource: MatTableDataSource<ReminderRow> = new MatTableDataSource(); private pagesize: number[]; loading: boolean = true; f1 = 'A';
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;  @ViewChild(MatSort, {static: true})sort: MatSort;
  sortingDataAccessor(item, property) {
    if (property.includes('.')) {
      return property.split('.')
        .reduce((object, key) => object[key], item); }
    return item[property];  }
  table(value) { this.ngOnInit(value.pageIndex + 1, value.pageSize); }
 constructor(public dialog: MatDialog, public _get: ListReminderService, public _post: PostDuesService) { }
  ngOnInit(page = 1, pageSize = 10) {this._get.getReminder(page + '&page_size=' +  pageSize + '&status=' + this.f1)
    .subscribe(data => { this.paginator.pageSize = pageSize; this.loading = false;
                         this.dataSource.data = data['results'] as [];
                         this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
                         this.paginator.length = data['count']; this.dataSource.sort = this.sort; this.pagesize = [5, 10, 25, 50, 100]; },
      () => {
        this.loading = false; const dialogRef = this.dialog.open(ErrordialogueComponent, {
          width: '600px', data: {name: 'Warning', icon: 'warning', content: 'Failed to Connect Server'}, });
        dialogRef.afterClosed().subscribe(() => { window.location.reload(); }); }); }
  submit(amount: string, id: any) {
    const data = new FormData();
    data.append('reminder', id);
    data.append('fine_amount', amount);
    data.append('fined_by', 'Admin');
    this._post.addFine(data)
      .subscribe(() => { alert('successfully added'); this.ngOnInit();
      }, () => {
        alert('error');
        });
  }
}
