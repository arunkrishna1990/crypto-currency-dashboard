"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const currency_controller_1 = require("./currency.controller");
exports.routes = express_1.Router();
exports.routes.get('/', currency_controller_1.CurrencyController.getLatestCryptoListings);
