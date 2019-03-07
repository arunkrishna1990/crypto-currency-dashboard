import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CryptoCurrency, CryptoDashboardService, Portfolio } from '../core/crypto-dashboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-portfolio',
  templateUrl: './create-portfolio.component.html',
  styleUrls: ['./create-portfolio.component.css']
})
export class CreatePortfolioComponent implements OnInit {

  cryptoCurrencies$: Observable<CryptoCurrency[]>;
  createPortfolioForm: FormGroup;
  constructor(private cryptoDashboardService: CryptoDashboardService,
    private fb: FormBuilder,
    private dialog: MatDialogRef<CreatePortfolioComponent>) {
    this.createPortfolioForm = this.fb.group({
      name: ['', Validators.required],
      selectedCurrencies: [null]
    });
  }

  ngOnInit() {
    this.cryptoCurrencies$ = this.cryptoDashboardService.getListOfCryptoCurrencies();
  }

  create() {
    const payload = <Portfolio>{
      name: this.createPortfolioForm.get('name').value,
      cryptoCurrencies: this.createPortfolioForm.get('selectedCurrencies').value
    };
    this.cryptoDashboardService.createNewPortfolio(payload);
    this.dialog.close(null);
  }
}
