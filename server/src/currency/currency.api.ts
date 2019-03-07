import { Router } from 'express';
import { CurrencyController } from './currency.controller';


export const routes = Router();

routes.get('/', CurrencyController.getLatestCryptoListings);