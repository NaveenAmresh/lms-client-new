import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { PostBookService } from '../../../services/post-book.service';
import { CheckconnService } from '../../../services/checkconn.service';
import { ListBooksService } from '../../../services/list-books.service';
import { ActivatedRoute } from '@angular/router';
import { isUndefined } from 'util';
import { MatDialog } from '@angular/material';
import {Field1Component} from '../setup/field1/field1.component';
@Component({
  selector: 'app-books',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.sass']
})
export class BookComponent implements OnInit {
  BookForm = this.fb.group({
    isbn: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(13), Validators.maxLength(13)]],
    author_name: [''],
    book_title: ['', [Validators.required, Validators.maxLength(100)]],
    category: ['', [Validators.required]],
    publisher: [''],
    book_url: [''],
    book_images: [''],
    pdf: [''],
    external_url: [''],
    price: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(10)]],
    quantity: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(10)]],
  });
  private categories: Object;
  private publishers: Object;
  private image: string | ArrayBuffer;
  private files: any;
  private filestring: string;
  modeSelect: number = 1;
  private id: number = 0;
  private book_img: any = '';
  private book_pdf: any  = '';
  private isbn: any = null;
  private u_pdf: any = null;
  private u_img: any = null;
  link1: string = 'link_off';
  link2: string = 'link_off';
  public checkIsbn(value) {
      this._check.isbn(value)
        .subscribe(data => {
            if (data.toString() === '') {
              return null;
            } else {
              this.BookForm.controls['isbn'].setErrors({'incorrect': true});
            }
          },
          () => {
            return null;
          });
      return { 'Something Went Wrong': true };
  }
  submit() {
    this.checkIsbn(this.BookForm.value.isbn);
    const form = new FormData();
    form.append('isbn', this.BookForm.value.isbn);
    form.append('author_name', this.BookForm.value.author_name);
    form.append('book_title', this.BookForm.value.book_title);
    form.append('category', this.BookForm.value.category);
    form.append('publisher', this.BookForm.value.publisher);
    form.append('book_url', this.BookForm.value.book_url);
    form.append('book_images', this.BookForm.value.book_images);
    form.append('pdf', this.BookForm.value.pdf);
    form.append('external_url', this.BookForm.value.external_url);
    form.append('price', this.BookForm.value.price);
    form.append('quantity', this.BookForm.value.quantity);
    this._post.addbook(form)
      .subscribe(() => {
        alert('Successfully Saved');
      },
        () => {
        alert('Oops! Something Went Wrong');
      });
  }
  update() {
    this.checkIsbn(this.BookForm.value.isbn);
    const form = new FormData();
    form.append('isbn', this.isbn);
    form.append('author_name', this.BookForm.value.author_name);
    form.append('book_title', this.BookForm.value.book_title);
    form.append('category', this.BookForm.value.category);
    form.append('publisher', this.BookForm.value.publisher);
    form.append('book_url', this.BookForm.value.book_url);
    if (this.u_img !== this.BookForm.value.book_images) {
      form.append('book_images', this.book_img);
    }
    if (this.u_pdf !== this.BookForm.value.pdf) {
      form.append('pdf', this.book_pdf);
    }
    form.append('external_url', this.BookForm.value.external_url);
    form.append('price', this.BookForm.value.price);
    form.append('quantity', this.BookForm.value.quantity);
    this._post.updatebook(this.id, form)
      .subscribe(() => {
        alert('Successfully Saved');
      },
        () => {
        alert('Oops! Something Went Wrong');
      });
  }
  up1(e) {
    e.stopPropagation();
    const dialogRef = this.dialog.open(Field1Component, {
      width: '65%', height: '30%', autoFocus: false, panelClass: 'padding'
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
  onImageChange(event) {
    const reader1 = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader1.readAsDataURL(file);
      reader1.onload = () => {
          this.book_img = reader1.result;
        };
    }
  }
  onFileChange(event) {
    const reader2 = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader2.readAsDataURL(file);
      reader2.onload = () => {
        this.book_pdf = reader2.result;
        };
  }}
  constructor(private fb: FormBuilder, private _post: PostBookService, private cd: ChangeDetectorRef, private _check: CheckconnService,
              private _crud: ListBooksService, private activatedRoute: ActivatedRoute,
              public dialog: MatDialog) {
    this._check.check();
    this._crud.listcats()
      .subscribe(data => {
          this.categories = data;
        },
        () => {
          this.categories = [{ category_id: 0, category: 'Not Available', status: 'A' }];
        });
    this._crud.listpub()
      .subscribe(data => {
          this.publishers = data;
        },
        () => {
          this.publishers = [{ publisher_id: 0, publisher: 'Not Available', status: 'A' }];
        });
  }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (isUndefined(params['id'])) {
        return this.id = 0;
      }
      this.id = params['id'];
      this._crud.book(this.id)
        .subscribe(data => {
          this.BookForm.controls.isbn.setValue(data['isbn']);
          this.BookForm.controls.isbn.disable();
          this.isbn = data['isbn'];
          this.BookForm.controls.isbn.setValue(data['isbn']);
          this.BookForm.controls.author_name.setValue(data['author_name']);
          this.BookForm.controls.book_title.setValue(data['book_title']);
          this.BookForm.controls.category.setValue(data['category']);
          this.BookForm.controls.publisher.setValue(data['publisher']);
          this.BookForm.controls.price.setValue(data['price']);
          this.BookForm.controls.quantity.setValue(data['quantity']);
          this.BookForm.controls.external_url.setValue(data['external_url']);
          this.u_img = data['book_images'];
          if (this.u_img !== null) {
            this.link1 = 'link';
          }
          this.u_pdf = data['pdf'];
          if (this.u_pdf !== null) {
            this.link2 = 'link';
          } }); }); } }
