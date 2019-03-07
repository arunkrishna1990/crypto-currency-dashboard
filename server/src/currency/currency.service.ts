import axios from 'axios';

export class CurrencyService {

    static async getLatestCryptoListingsInUSD(start: number) {
        const url = `${process.env.API_URL}/cryptocurrency/listings/latest?start=${start}&limit=1000&convert=USD`;
        const response = await axios.get(url, { headers: { 'X-CMC_PRO_API_KEY': process.env.API_KEY } });
        return response && response.data && this.maptoCryptoCurrency(response.data.data);
    }

    private static maptoCryptoCurrency(currencyList: any[]) {
        return currencyList.map(item => new CryptoCurrency(item.id, item.name, item.quote.USD.price))
    }
}

export class CryptoCurrency {
    constructor(public id: number, public name: string, public price: number) {

    }
}