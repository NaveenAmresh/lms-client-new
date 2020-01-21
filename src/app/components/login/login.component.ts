import { Component, OnInit } from '@angular/core';
import {ForgotPasswwordComponent} from '../popup/forgot-passwword/forgot-passwword.component';
import { MatDialog } from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';
import {PostUserService} from '../services/post.service';
import {Router} from '@angular/router';
import {CheckconnService} from '../services/checkconn.service';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  logintitle = 'Login Form';
  constructor(public setTitle: CheckconnService, public dialog: MatDialog, private fb: FormBuilder, public _snackBar: MatSnackBar,
              private _post: PostUserService, public router: Router) {
  }
  loginForm = this.fb.group({
    username : ['', Validators.required],
    password : ['', Validators.required]
  });
  openDialog(): void {
    const dialogRef = this.dialog.open(ForgotPasswwordComponent, {
      width: '600px',
      data: {name: 'Forgot Password?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.animal);
    });
  }
  login() {
    const form = new FormData();
    form.append('username', this.loginForm.value.username);
    form.append('password', this.loginForm.value.password);
    this._post.login(form)
      .subscribe(data => {
        localStorage.setItem('accessToken', data['access']);
        localStorage.setItem('refreshToken', data['refresh']);
        this.router.navigate(['/panel']);
      }, () => {
        this._snackBar.open('Oops! Username and Password doesn\'t match', 'Close',
          {duration: 5000, panelClass: ['error']});
      });
  }
  ngOnInit() {this.setTitle.set()
    .subscribe(data => {
      this.logintitle = data['login_title'];
    });
  }

}
