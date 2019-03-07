import { SequelizeDb } from "../SequelizeDb";
import { PortfolioDAO } from "./portfolio.dao";
import { Portfolio } from "../model/Portfolio.model";

require('dotenv').config();
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000
describe('PortfolioDAOSpec', () => {
    let db: SequelizeDb | null;
    beforeAll(async () => {
        db = new SequelizeDb();
        await db.createTestDb();
    });

    afterAll(async () => {
        if (db) {
            await db.dropTestDb();
        }
        db = null;
    });

    describe('add and get', () => {
        it('should insert the portfolio', async () => {
            const portfolioDAO = new PortfolioDAO();
            const mockPayload = <Portfolio>{
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
            await portfolioDAO.add(mockPayload);

            const result = await portfolioDAO.get();

            expect(result[0].name).toEqual(mockPayload.name);
            expect(result[0].cryptoCurrencies).toEqual(mockPayload.cryptoCurrencies);
        })
    });
})