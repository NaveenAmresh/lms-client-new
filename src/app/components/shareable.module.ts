import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {ErrordialogueComponent} from './popup/errordialogue/errordialogue.component';
import {MaterialModule} from '../material.module';
import {NgxPrintModule} from 'ngx-print';
import {ForgotPasswwordComponent} from './popup/forgot-passwword/forgot-passwword.component';
import {BookslistComponent} from './popup/bookslist/bookslist.component';
import {AlertComponent} from './popup/alert/alert.component';
import {ColorPickerModule} from 'ngx-color-picker';
import {Field1Component} from './main/pages/setup/field1/field1.component';
import {Field2Component} from './main/pages/setup/field2/field2.component';
import {SetupComponent} from './main/pages/setup/setup.component';
import {ErrorComponent} from './error/error.component';
import {RouterModule} from '@angular/router';
@NgModule({
  declarations: [ForgotPasswwordComponent, ErrordialogueComponent, BookslistComponent, AlertComponent, ErrorComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, HttpClientXsrfModule, MaterialModule,
    NgxPrintModule, ColorPickerModule, RouterModule],
  providers: [DatePipe],
  exports: [FormsModule, ReactiveFormsModule, HttpClientModule, HttpClientXsrfModule, NgxPrintModule, ColorPickerModule, ErrorComponent],
  entryComponents: [ForgotPasswwordComponent, ErrordialogueComponent, BookslistComponent, Field1Component, Field2Component, SetupComponent]
})
export class ShareableModule { }
