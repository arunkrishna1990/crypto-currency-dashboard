import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreatePortfolioComponent } from './create-portfolio/create-portfolio.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private dialog: MatDialog) {

  }

  openModal() {
    this.dialog.open(CreatePortfolioComponent, { minWidth: 500, minHeight: 500, maxWidth: 800, maxHeight: 800 });
  }
}
