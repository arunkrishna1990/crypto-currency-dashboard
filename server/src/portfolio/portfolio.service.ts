import { PortfolioDAO } from "../shared/db/dao/portfolio.dao";
import { Portfolio } from "../shared/db/model/Portfolio.model";

export class PortfolioService {

    constructor(private portfolioDAO: PortfolioDAO) {

    }

    async create(payload: Portfolio) {
        return await this.portfolioDAO.add(payload);
    }

    async get() {
        return await this.portfolioDAO.get();
    }
}