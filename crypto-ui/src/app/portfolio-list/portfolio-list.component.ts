import { Component, OnInit } from '@angular/core';
import { CryptoDashboardService, Portfolio } from '../core/crypto-dashboard.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css']
})
export class PortfolioListComponent implements OnInit {

  portfolios$: Observable<Portfolio[]>;
  constructor(private cryptoDashboardService: CryptoDashboardService) { }

  ngOnInit() {
    this.portfolios$ = this.cryptoDashboardService.getAllPortfolios();
  }
}
