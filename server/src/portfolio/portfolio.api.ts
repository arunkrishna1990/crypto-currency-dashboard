import { Router } from 'express';
import { PortfolioController } from './portfolio.controller';
import { PortfolioDAO } from '../shared/db/dao/portfolio.dao';
import { PortfolioService } from './portfolio.service';


export const routes = Router();

const portfolioController = new PortfolioController(new PortfolioService(new PortfolioDAO()));
routes.get('/', (req, res) => {
    portfolioController.get(req, res)
});
routes.post('/', (req, res) => {
    portfolioController.create(req, res)
});