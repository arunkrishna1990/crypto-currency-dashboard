import { DbPortfolio } from '../model/DbPortfolio.model';
import { Portfolio } from '../model/Portfolio.model';

export class PortfolioDAO {
    constructor() {
    }

    async add(portfolio: Portfolio): Promise<Portfolio> {
        try {
            const createdPortfolio = await DbPortfolio.build({
                id: portfolio.id,
                name: portfolio.name,
                cryptoCurrencies: portfolio.cryptoCurrencies
            }).save();
            return new Portfolio(createdPortfolio.id, createdPortfolio.name, createdPortfolio.cryptoCurrencies)
        } catch (error) {
            throw error;
        }
    }

    async get(): Promise<Portfolio[]> {
        try {
            const portfolios = await DbPortfolio.findAll();
            return portfolios.map(portfolio => new Portfolio(portfolio.id, portfolio.name, portfolio.cryptoCurrencies));
        } catch (error) {
            throw error;
        }
    }
}
