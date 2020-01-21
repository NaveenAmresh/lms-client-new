import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-errordialogue',
  templateUrl: './errordialogue.component.html',
  styleUrls: ['./errordialogue.component.sass']
})
export class ErrordialogueComponent {
  constructor(public dialogRef: MatDialogRef<ErrordialogueComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }
  onClick(): void {
    this.dialogRef.close(this.data);
  }
}
