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
const DbPortfolio_model_1 = require("../model/DbPortfolio.model");
const Portfolio_model_1 = require("../model/Portfolio.model");
class PortfolioDAO {
    constructor() {
    }
    add(portfolio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdPortfolio = yield DbPortfolio_model_1.DbPortfolio.build({
                    id: portfolio.id,
                    name: portfolio.name,
                    cryptoCurrencies: portfolio.cryptoCurrencies
                }).save();
                return new Portfolio_model_1.Portfolio(createdPortfolio.id, createdPortfolio.name, createdPortfolio.cryptoCurrencies);
            }
            catch (error) {
                throw error;
            }
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const portfolios = yield DbPortfolio_model_1.DbPortfolio.findAll();
                return portfolios.map(portfolio => new Portfolio_model_1.Portfolio(portfolio.id, portfolio.name, portfolio.cryptoCurrencies));
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.PortfolioDAO = PortfolioDAO;
