import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioListComponent } from './portfolio-list.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { CryptoDashboardService } from '../core/crypto-dashboard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignModule } from '../shared/material.module';

describe('PortfolioListComponent', () => {
  let component: PortfolioListComponent;
  let fixture: ComponentFixture<PortfolioListComponent>, mockCryptoDashboardService;
  const mockPortfolios = [{
    'id': '3',
    'name': 'test',
    'cryptoCurrencies': [
      {
        'id': 1,
        'name': 'Bitcoin',
        'price': 10,
      },
      {
        'id': 52,
        'name': 'XRP',
        'price': 20
      },
      {
        'id': 1027,
        'name': 'Ethereum',
        'price': 15
      },
      {
        'id': 825,
        'name': 'Tether',
        'price': 5
      }
    ],
    'total': 50
  },
  {
    'id': '4',
    'name': 'test2',
    'cryptoCurrencies': [
      {
        'id': 52,
        'name': 'XRP',
        'price': 10
      },
      {
        'id': 1027,
        'name': 'Ethereum',
        'price': 5
      }
    ],
    'total': 15
  }];

  beforeEach(async(() => {
    mockCryptoDashboardService = jasmine.createSpyObj('CryptoDashboardService', ['getAllPortfolios']);
    mockCryptoDashboardService.getAllPortfolios.and.returnValue(of(mockPortfolios));
    TestBed.configureTestingModule({
      declarations: [PortfolioListComponent],
      imports: [BrowserAnimationsModule, MaterialDesignModule],
      providers: [{
        provide: CryptoDashboardService, useValue: mockCryptoDashboardService
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when the component is compiled', () => {
    it('should render the list of crypto currencies', () => {
      const listItems = fixture.debugElement.queryAll(By.css('.mat-expansion-panel'));
      expect(listItems.length).toEqual(mockPortfolios.length);

      for (let i = 0; i < listItems.length; i++) {
        expect(listItems[i].nativeElement.innerHTML).toContain(mockPortfolios[i].name);
        expect(listItems[i].nativeElement.innerHTML).toContain(mockPortfolios[i].total);
        for (let j = 0; j < mockPortfolios[i].cryptoCurrencies.length; j++) {
          expect(listItems[i].nativeElement.innerHTML).toContain(mockPortfolios[i].cryptoCurrencies[j].name);
          expect(listItems[i].nativeElement.innerHTML).toContain(mockPortfolios[i].cryptoCurrencies[j].price);
        }
      }
    });
  });
});
