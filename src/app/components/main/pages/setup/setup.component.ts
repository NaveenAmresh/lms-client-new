import {Component} from '@angular/core';
import {ListBooksService} from '../../../services/list-books.service';
import {PostBookService} from '../../../services/post-book.service';
import {MatSnackBar} from '@angular/material';
import {LayoutComponent} from '../../layout/layout.component';
import {AppComponent} from '../../../../app.component';
@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.sass'],
})
export class SetupComponent {
  fb = new FormData();
  private title: string = 'Institutional Setup';
  constructor(public _get: ListBooksService, public _post: PostBookService, public _snackBar: MatSnackBar, public lay: LayoutComponent,
              public app: AppComponent) {
  }}
