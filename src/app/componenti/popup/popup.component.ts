import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  template: `
    <h2 mat-dialog-title>{{ data.tipo }}</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
  `,
})
export class PopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
