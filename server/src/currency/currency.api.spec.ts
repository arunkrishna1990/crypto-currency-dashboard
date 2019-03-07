import { SequelizeDb } from "../shared/db/SequelizeDb";
import Axios from "axios";

require('dotenv').config();
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000
describe('CurrencyAPISpec', () => {
    let server: any, db: SequelizeDb;
    const baseURL = 'http://localhost:3000';

    beforeAll(async () => {
        db = new SequelizeDb();
        await db.createTestDb();
        const { startServer } = require('../server');
        server = startServer();
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000
    });

    afterAll(async () => {
        await db.dropTestDb();
        server.close()
    });

    describe('POST /portfolio', () => {
        it(`should create a new portfolio`, async () => {
            const mockData = {
                name: 'DummyName',
                cryptoCurrencies: [{
                    'id': 1,
                    'name': 'Bitcoin',
                    'price': 3881.88864625
                },
                {
                    'id': 52,
                    'name': 'XRP',
                    'price': 0.353610065729
                }]
            };
            const response = await Axios.post(`${baseURL}/api/portfolio`, mockData);

            expect(response.data.name).toEqual(mockData.name);
            expect(response.data.cryptoCurrencies).toEqual(mockData.cryptoCurrencies);
        });
    });

    describe('GET /portfolio', () => {
        it(`should respond with a list of portfolios`, async () => {
            const mockData = {
                name: 'DummyName',
                cryptoCurrencies: [{
                    'id': 1,
                    'name': 'Bitcoin',
                    'price': 3881.88864625
                },
                {
                    'id': 52,
                    'name': 'XRP',
                    'price': 0.353610065729
                }]
            };
            await Axios.post(`${baseURL}/api/portfolio`, mockData);

            const response = await Axios.get(`${baseURL}/api/portfolio`);

            expect(response.data[0].name).toEqual(mockData.name);
            expect(response.data[0].cryptoCurrencies).toEqual(mockData.cryptoCurrencies);
        });
    });
})