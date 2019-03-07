import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CryptoCurrencyListComponent } from './crypto-currency-list/crypto-currency-list.component';
import { PortfolioListComponent } from './portfolio-list/portfolio-list.component';
import { MaterialDesignModule } from './shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { CreatePortfolioComponent } from './create-portfolio/create-portfolio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CryptoCurrencyListComponent,
    PortfolioListComponent,
    CreatePortfolioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CreatePortfolioComponent]
})
export class AppModule { }
