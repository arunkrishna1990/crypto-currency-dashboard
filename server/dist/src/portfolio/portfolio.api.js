"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const portfolio_controller_1 = require("./portfolio.controller");
const portfolio_dao_1 = require("../shared/db/dao/portfolio.dao");
const portfolio_service_1 = require("./portfolio.service");
exports.routes = express_1.Router();
const portfolioController = new portfolio_controller_1.PortfolioController(new portfolio_service_1.PortfolioService(new portfolio_dao_1.PortfolioDAO()));
exports.routes.get('/', (req, res) => {
    portfolioController.get(req, res);
});
exports.routes.post('/', (req, res) => {
    portfolioController.create(req, res);
});
