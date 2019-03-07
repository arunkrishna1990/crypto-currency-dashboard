import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CryptoDashboardService {

  private cryptoCurrenciesSubject = new BehaviorSubject<CryptoCurrency[]>(null);
  private portfolioSubject = new BehaviorSubject<Portfolio[]>(null);

  constructor(private http: HttpClient) {
    this.getLatestCryptoCurrencyList();
    this.getPortfolios();
  }

  private getLatestCryptoCurrencyList(start: number = 1) {
    this.http.get(`${environment.host}/api/currency?start=1`).subscribe((response: CryptoCurrency[]) => {
      this.cryptoCurrenciesSubject.next(response);
    });
  }

  private getPortfolios() {
    this.http.get(`${environment.host}/api/portfolio`).pipe(
      map((portfolios: Portfolio[]) => portfolios.map(p => this.calculateTotalPrice(p)))
    ).subscribe((response: Portfolio[]) => {
      this.portfolioSubject.next(response);
    });
  }

  private calculateTotalPrice(portfolio: Portfolio) {
    let total = 0;
    portfolio.cryptoCurrencies.forEach(currency => total += currency.price);
    return { ...portfolio, total };
  }

  getListOfCryptoCurrencies() {
    return this.cryptoCurrenciesSubject.asObservable();
  }

  getAllPortfolios() {
    return this.portfolioSubject.asObservable();
  }

  createNewPortfolio(payload: Portfolio) {
    this.http.post(`${environment.host}/api/portfolio`, payload).subscribe(() => {
      this.getPortfolios();
    });
  }
}

export interface CryptoCurrency {
  id: number;
  name: string;
  price: number;
}

export interface Portfolio {
  id?: string;
  name: string;
  cryptoCurrencies: { name: string, price: number }[];
  total?: number;
}
