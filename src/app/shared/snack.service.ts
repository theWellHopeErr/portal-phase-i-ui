import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(msg) {
    this.snackBar.open(msg, 'Close', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 5000,
    });
  }
}
