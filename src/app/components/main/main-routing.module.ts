import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {LayoutComponent} from './layout/layout.component';
import {UserListComponent} from './pages/user-list/user-list.component';
import {UsersComponent} from './pages/users/users.component';
import {BookComponent} from './pages/book/book.component';
import {BookListComponent} from './pages/book-list/book-list.component';
import {ChangePasswordComponent} from './pages/change-password/change-password.component';
import {IssuebookComponent} from './pages/issuebook/issuebook.component';
import {IssuedListComponent} from './pages/issued-list/issued-list.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {SetupComponent} from './pages/setup/setup.component';
import {ReminderComponent} from './pages/reminder/reminder.component';
import {DuesComponent} from './pages/dues/dues.component';
import {PrintComponent} from './pages/users/print/print.component';
import {AuthGuardService as AuthGuard} from '../services/auth-guard.service';
const routes: Routes = [
  { path: 'panel', component: LayoutComponent, children: [
      { path: '', redirectTo: 'dash', pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'dash', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'usersList', component: UserListComponent, canActivate: [AuthGuard] },
      { path: 'user', component: UsersComponent, canActivate: [AuthGuard] },
      { path: 'book', component: BookComponent, canActivate: [AuthGuard] },
      { path: 'bookList', component: BookListComponent, canActivate: [AuthGuard] },
      { path: 'changePassword', component: ChangePasswordComponent, canActivate: [AuthGuard] },
      { path: 'issueBook', component: IssuebookComponent, canActivate: [AuthGuard] },
      { path: 'issuedList', component: IssuedListComponent, canActivate: [AuthGuard] },
      { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
      { path: 'setup', component: SetupComponent, canActivate: [AuthGuard] },
      { path: 'reminder', component: ReminderComponent, canActivate: [AuthGuard] },
      { path: 'dues', component: DuesComponent, canActivate: [AuthGuard] },
      { path: 'print', component: PrintComponent, canActivate: [AuthGuard] },
      { path: 'set', component: SettingsComponent, canActivate: [AuthGuard] },
    ], canActivate: [AuthGuard] },
  { path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
