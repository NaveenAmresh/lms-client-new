import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-passwword',
  templateUrl: './forgot-passwword.component.html',
  styleUrls: ['./forgot-passwword.component.sass']
})
export class ForgotPasswwordComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ForgotPasswwordComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }
  onNoClick(): void {
    this.dialogRef.close(this.data);
  }
  ngOnInit() {
  }

}
