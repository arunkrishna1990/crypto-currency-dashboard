import { Router } from 'express';
import { routes as PortfolioAPI } from './portfolio/portfolio.api';
import { routes as CurrencyAPI } from './currency/currency.api';

// This acts as a route module where new main routes can be added and each subroutes can modularized in each api layers

export const routes = Router();
routes.use('/portfolio', PortfolioAPI);
routes.use('/currency', CurrencyAPI);