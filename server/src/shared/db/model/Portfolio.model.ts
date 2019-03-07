import { CryptoCurrency } from "../../../currency/currency.service";

export class Portfolio {
    constructor(public id: string, public name: string, public cryptoCurrencies: CryptoCurrency[]) {

    }
}