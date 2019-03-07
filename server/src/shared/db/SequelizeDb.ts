import { Sequelize } from 'sequelize-typescript';
import { DbPortfolio } from './model/DbPortfolio.model';
import { migrate } from '../../../db.migrations';

interface IDBConfig {
    name: string;
    user: string;
    password: string;
    settings: {
        dialect: string;
        host: string;
        port: number;
        dialectOptions: {
            ssl: boolean;
        }
    };

}

export class SequelizeDb {

    private testDbName: string = '';
    sequelize: Sequelize;
    private readonly dbConfig: IDBConfig;

    constructor() {
        this.dbConfig = JSON.parse(process.env.DB || '');
        this.sequelize = this.createConnection(this.dbConfig.name);
    }

    create(): void {
        this.createTables(this.sequelize);
    }

    async clear(): Promise<void> {
        await this.sequelize.drop();
    }

    async createTestDb(): Promise<void> {
        try {
            this.testDbName = `test_${Date.now()}`;
            await this.sequelize.query(`create database ${this.testDbName}`);
            await this.sequelize.query(`grant all privileges on database ${this.testDbName} to crypto`);

            const testDb = this.createConnection(this.testDbName);

            this.sequelize = testDb;

            this.createTables(testDb);
            
            return migrate(testDb);
        } catch (e) {
            console.error(e)
        }

    }

    async dropTestDb(): Promise<void> {
        // Close the testDb connection
        this.sequelize.connectionManager.close();

        // Connect to the regular database so we can drop the test database
        this.sequelize = this.createConnection(this.dbConfig.name);

        // Drop the test database
        await this.sequelize.query(`drop database ${this.testDbName}`);
    }

    private createTables(sq: Sequelize) {
        sq.addModels([DbPortfolio]);
    }

    private createConnection(dbName: string): Sequelize {
        return new Sequelize({
            database: dbName,
            username: this.dbConfig.user,
            password: this.dbConfig.password,
            dialect: this.dbConfig.settings.dialect,
            host: this.dbConfig.settings.host,
            dialectOptions: this.dbConfig.settings.dialectOptions,
            port: this.dbConfig.settings.port,
        });
    }
} 
