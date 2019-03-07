import { Component, OnInit } from '@angular/core';
import { CryptoCurrency, CryptoDashboardService } from '../core/crypto-dashboard.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-crypto-currency-list',
  templateUrl: './crypto-currency-list.component.html',
  styleUrls: ['./crypto-currency-list.component.css']
})
export class CryptoCurrencyListComponent implements OnInit {
  cryptoCurrencies$: Observable<CryptoCurrency[]>;
  constructor(private cryptoDashboardService: CryptoDashboardService) { }

  ngOnInit() {
    this.cryptoCurrencies$ = this.cryptoDashboardService.getListOfCryptoCurrencies();
  }
}
