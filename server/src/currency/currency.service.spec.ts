import { CurrencyService, CryptoCurrency } from "./currency.service";
import Axios from "axios";

describe('PortfolioServiceSpec', () => {
    const mockResponse = {
        "status": {
            "timestamp": "2019-03-06T23:49:27.432Z",
            "error_code": 0,
            "error_message": null,
            "elapsed": 6,
            "credit_count": 1
        },
        "data": [
            {
                "id": 1,
                "name": "Bitcoin",
                "symbol": "BTC",
                "slug": "bitcoin",
                "circulating_supply": 17435912,
                "total_supply": 17435912,
                "max_supply": 21000000,
                "date_added": "2013-04-28T00:00:00.000Z",
                "num_market_pairs": 6695,
                "tags": [
                    "mineable"
                ],
                "platform": null,
                "cmc_rank": 1,
                "last_updated": "2018-12-22T06:08:23.000Z",
                "quote": {
                    "USD": {
                        "price": 3881.88864625,
                        "volume_24h": 6341959230.33247,
                        "percent_change_1h": 0.426252,
                        "percent_change_24h": -4.10839,
                        "percent_change_7d": 19.472,
                        "market_cap": 67684268829.81413,
                        "last_updated": "2018-12-22T06:08:23.000Z"
                    }
                }
            },
            {
                "id": 52,
                "name": "XRP",
                "symbol": "XRP",
                "slug": "ripple",
                "circulating_supply": 40794121066,
                "total_supply": 99991738974,
                "max_supply": 100000000000,
                "date_added": "2013-08-04T00:00:00.000Z",
                "num_market_pairs": 307,
                "tags": [],
                "platform": null,
                "cmc_rank": 2,
                "last_updated": "2018-12-22T06:08:03.000Z",
                "quote": {
                    "USD": {
                        "price": 0.353610065729,
                        "volume_24h": 617573458.768739,
                        "percent_change_1h": 0.712268,
                        "percent_change_24h": -3.66051,
                        "percent_change_7d": 22.3608,
                        "market_cap": 14425211831.505043,
                        "last_updated": "2018-12-22T06:08:03.000Z"
                    }
                }
            }
        ]
    }

    describe('getLatestCryptoListingsInUSD', () => {
        let axiosSpy: any, mockStart = 10, result: CryptoCurrency[];
        beforeEach(async () => {
            process.env.API_URL = 'http://dummy.api.com'
            process.env.API_KEY = 'dummyAPIKey';
            axiosSpy = spyOn(Axios, 'get').and.returnValue({ data: mockResponse });
            result = await CurrencyService.getLatestCryptoListingsInUSD(mockStart);
        });

        afterEach(() => {
            delete process.env.API_URL;
            delete process.env.API_KEY;
        })

        it('should call axios.get with the correct url', () => {
            const mockHeader = { headers: { 'X-CMC_PRO_API_KEY': 'dummyAPIKey' } }
            expect(axiosSpy)
                .toHaveBeenCalledWith(
                    `http://dummy.api.com/cryptocurrency/listings/latest?start=${mockStart}&limit=1000&convert=USD`,
                    mockHeader);
        });

        it('should convert the response to a portfolio model', async () => {
            const expectedCurrencies = [new CryptoCurrency(1, 'Bitcoin', 3881.88864625), new CryptoCurrency(52, 'XRP', 0.353610065729)];

            expect(result).toEqual(expectedCurrencies);
        });
    });
})