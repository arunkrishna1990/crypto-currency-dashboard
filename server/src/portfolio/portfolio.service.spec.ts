import { PortfolioService } from "./portfolio.service";

describe('PortfolioServiceSpec', () => {
    let portfolioService: any, mockPortfolioDAO: any;
    const mockData = {
        name: 'DummyName',
        cryptoCurrencies: [{
            id: 1,
            name: 'Bitcoin',
            price: 10
        }]
    }
    beforeEach(() => {
        mockPortfolioDAO = jasmine.createSpyObj('PortfolioDAO', ['add', 'get'])
        portfolioService = new PortfolioService(mockPortfolioDAO);
    });

    describe('create', () => {
        it('should call portfolioDAO.create with the payload', () => {
            portfolioService.create(mockData);

            expect(mockPortfolioDAO.add).toHaveBeenCalledWith(mockData);
        });

        it('should call portfolioDAO.create with the payload', async () => {
            mockPortfolioDAO.add.and.returnValue(mockData)

            const result = await portfolioService.create(mockData);

            expect(result).toEqual(mockData);
        });
    });

    describe('get', () => {
        it('should call portfolioDAO.get with the payload', async () => {
            mockPortfolioDAO.get.and.returnValue([mockData])

            const result = await portfolioService.get();

            expect(result).toEqual([mockData]);
        })
    })
})