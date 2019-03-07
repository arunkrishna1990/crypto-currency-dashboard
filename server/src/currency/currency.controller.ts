import { Request, Response } from 'express';
import { HttpStatusCodes } from "../shared/HttpStatusCodes";
import { CurrencyService } from './currency.service';

export class CurrencyController {
    static async getLatestCryptoListings(req: Request, res: Response) {
        try {
            const response = await CurrencyService.getLatestCryptoListingsInUSD(req.query.start || 1);
            res.status(HttpStatusCodes.OK).send(response);
        } catch (e) {
            res.status(HttpStatusCodes.BadRequest).send(e);
        }
    }
}