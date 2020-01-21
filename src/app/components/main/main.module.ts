import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from '../../material.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UsersComponent } from './pages/users/users.component';
import { ShareableModule } from '../shareable.module';
import { BookComponent } from './pages/book/book.component';
import { BookListComponent } from './pages/book-list/book-list.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { IssuebookComponent } from './pages/issuebook/issuebook.component';
import { IssuedListComponent } from './pages/issued-list/issued-list.component';
import { CompareValidatorDirective } from './validators/compare-validator.directive';
import { SettingsComponent } from './pages/settings/settings.component';
import { SetupComponent } from './pages/setup/setup.component';
import { Field1Component } from './pages/setup/field1/field1.component';
import { Field2Component } from './pages/setup/field2/field2.component';
import { Field3Component } from './pages/setup/field3/field3.component';
import { ReminderComponent } from './pages/reminder/reminder.component';
import { DuesComponent } from './pages/dues/dues.component';
import { PrintComponent } from './pages/users/print/print.component';
@NgModule({
  declarations: [
    MainComponent, LayoutComponent, DashboardComponent, UserListComponent, UsersComponent, BookComponent, BookListComponent,
    ChangePasswordComponent, IssuebookComponent, IssuedListComponent, CompareValidatorDirective, SettingsComponent, SetupComponent,
    Field1Component, Field2Component, Field3Component, ReminderComponent, DuesComponent, PrintComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    ShareableModule,
  ]
})
export class MainModule {
}
