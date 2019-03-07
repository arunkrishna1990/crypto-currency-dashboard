"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatusCodes_1 = require("../shared/HttpStatusCodes");
const currency_service_1 = require("./currency.service");
class CurrencyController {
    static getLatestCryptoListings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield currency_service_1.CurrencyService.getLatestCryptoListingsInUSD(req.query.start || 1);
                res.status(HttpStatusCodes_1.HttpStatusCodes.OK).send(response);
            }
            catch (e) {
                res.status(HttpStatusCodes_1.HttpStatusCodes.BadRequest).send(e);
            }
        });
    }
}
exports.CurrencyController = CurrencyController;
