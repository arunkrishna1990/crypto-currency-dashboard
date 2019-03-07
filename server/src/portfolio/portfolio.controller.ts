import { PortfolioService } from "./portfolio.service";
import { Request, Response } from 'express';
import { HttpStatusCodes } from "../shared/HttpStatusCodes";

export class PortfolioController {

    constructor(private portfolioService: PortfolioService) {

    }

    async get(req: Request, res: Response) {
        try {
            const portfolios = await this.portfolioService.get();
            res.status(HttpStatusCodes.OK).send(portfolios);
        } catch (e) {
            res.status(HttpStatusCodes.BadRequest).send(e);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const createdPortfolio = await this.portfolioService.create(req.body);
            res.status(HttpStatusCodes.OK).send(createdPortfolio);
        } catch (e) {
            res.status(HttpStatusCodes.BadRequest).send(e);
        }
    }


}