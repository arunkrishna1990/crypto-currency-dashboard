"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const portfolio_api_1 = require("./portfolio/portfolio.api");
const currency_api_1 = require("./currency/currency.api");
// This acts as a route module where new main routes can be added and each subroutes can modularized in each api layers
exports.routes = express_1.Router();
exports.routes.use('/portfolio', portfolio_api_1.routes);
exports.routes.use('/currency', currency_api_1.routes);
