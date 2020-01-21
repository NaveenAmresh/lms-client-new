import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {CompareValidator} from '../../validators/compare-validator.directive';
import {CheckconnService} from '../../../services/checkconn.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.sass']
})
export class ChangePasswordComponent implements OnInit {

  public passwordForm = this.fb.group({
    password : ['', [Validators.required, Validators.minLength(8)]],
    c_password : ['', [Validators.required, CompareValidator('password')]]
  });
  constructor(private fb: FormBuilder, private _check: CheckconnService) {
    this._check.check();
  }

  ngOnInit() {
  }

}
