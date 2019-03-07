"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
exports.startServer = () => {
    const http = require('http');
    const { routes } = require('./routes');
    const bodyParser = require('body-parser');
    const cors = require('cors');
    const app = express_1.default();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    const port = 3000;
    const server = http.createServer(app).listen(3000);
    console.log(`Listening ${port}`);
    console.log('Register all the routes');
    app.use('/api', routes);
    app.get('/', (req, response) => {
        response.send('CryptoCurrency API');
    });
    return server;
};
