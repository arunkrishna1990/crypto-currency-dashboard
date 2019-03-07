import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoCurrencyListComponent } from './crypto-currency-list.component';
import { CryptoDashboardService } from '../core/crypto-dashboard.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MaterialDesignModule } from '../shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CryptoCurrencyListComponent', () => {
  let component: CryptoCurrencyListComponent;
  let fixture: ComponentFixture<CryptoCurrencyListComponent>, mockCryptoDashboardService;
  const mockCryptoCurrencies = [{
    'id': 1,
    'name': 'Bitcoin',
    'price': 3881.88864625
  },
  {
    'id': 52,
    'name': 'XRP',
    'price': 0.353610065729
  },
  {
    'id': 1027,
    'name': 'Ethereum',
    'price': 108.4856134
  }];

  beforeEach(async(() => {
    mockCryptoDashboardService = jasmine.createSpyObj('CryptoDashboardService', ['getListOfCryptoCurrencies']);
    mockCryptoDashboardService.getListOfCryptoCurrencies.and.returnValue(of(mockCryptoCurrencies));
    TestBed.configureTestingModule({
      declarations: [CryptoCurrencyListComponent],
      imports: [BrowserAnimationsModule, MaterialDesignModule],
      providers: [{
        provide: CryptoDashboardService, useValue: mockCryptoDashboardService
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoCurrencyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when the component is compiled', () => {
    it('should render the list of crypto currencies', () => {
      const listItems = fixture.debugElement.queryAll(By.css('.mat-list-item'));
      expect(listItems.length).toEqual(mockCryptoCurrencies.length);

      for (let i = 0; i < listItems.length; i++) {
        expect(listItems[i].nativeElement.innerHTML).toContain(mockCryptoCurrencies[i].name);
        expect(listItems[i].nativeElement.innerHTML).toContain(mockCryptoCurrencies[i].price);
      }
    });
  });
});
