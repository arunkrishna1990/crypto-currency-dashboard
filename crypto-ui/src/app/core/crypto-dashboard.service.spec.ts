import { TestBed, inject } from '@angular/core/testing';

import { CryptoDashboardService } from './crypto-dashboard.service';
import { environment } from 'src/environments/environment';
import { of, NEVER } from 'rxjs';

describe('CryptoDashboardService', () => {
  let cryptoDashboardService: CryptoDashboardService, mockHttpClient;
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
    ]
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
    ]
  }];

  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    mockHttpClient.get.and.returnValues(of(mockCryptoCurrencies), of(mockPortfolios));
    mockHttpClient.post.and.returnValue(NEVER);

    cryptoDashboardService = new CryptoDashboardService(mockHttpClient);
  });

  describe('when the service is instantiated', () => {
    it('should make an http request to get the crypto currency list', () => {
      expect(mockHttpClient.get).toHaveBeenCalledWith(`${environment.host}/api/currency?start=1`);
    });

    it('should make an http request to get the list portfolios', () => {
      expect(mockHttpClient.get).toHaveBeenCalledWith(`${environment.host}/api/portfolio`);
    });
  });

  describe('getListOfCryptoCurrencies', () => {
    it('should return an observable that contains a list of crypto currencies', () => {
      cryptoDashboardService.getListOfCryptoCurrencies().subscribe(result => {
        expect(result).toEqual(mockCryptoCurrencies);
      });
    });
  });

  describe('getAllPortfolios', () => {
    it('should return an observable that contains a list of crypto currencies', () => {
      const expectedPortfolios = [{ ...mockPortfolios[0], total: 50 }, { ...mockPortfolios[1], total: 15 }];
      cryptoDashboardService.getAllPortfolios().subscribe(result => {
        expect(result).toEqual(expectedPortfolios);
      });
    });
  });

  describe('createNewPortfolio', () => {
    it('should perform a http post request with the portfolio payload', () => {
      const mockPortfolio = {
        name: 'DummyPortFolio',
        cryptoCurrencies: [{
          'id': 52,
          'name': 'XRP',
          'price': 0.353610065729
        },
        {
          'id': 1027,
          'name': 'Ethereum',
          'price': 108.4856134
        }]
      };

      cryptoDashboardService.createNewPortfolio(mockPortfolio);

      expect(mockHttpClient.post).toHaveBeenCalledWith(`${environment.host}/api/portfolio`, mockPortfolio);
    });
  });
});
