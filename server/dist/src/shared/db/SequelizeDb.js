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
const sequelize_typescript_1 = require("sequelize-typescript");
const DbPortfolio_model_1 = require("./model/DbPortfolio.model");
const db_migrations_1 = require("../../../db.migrations");
class SequelizeDb {
    constructor() {
        this.testDbName = '';
        this.dbConfig = JSON.parse(process.env.DB || '');
        this.sequelize = this.createConnection(this.dbConfig.name);
    }
    create() {
        this.createTables(this.sequelize);
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sequelize.drop();
        });
    }
    createTestDb() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.testDbName = `test_${Date.now()}`;
                yield this.sequelize.query(`create database ${this.testDbName}`);
                console.log('reached 1');
                yield this.sequelize.query(`grant all privileges on database ${this.testDbName} to crypto`);
                console.log('reached2');
                const testDb = this.createConnection(this.testDbName);
                console.log('reached3');
                this.sequelize = testDb;
                console.log('reached4');
                this.createTables(testDb);
                return db_migrations_1.migrate(testDb);
            }
            catch (e) {
                console.log('reached');
                console.error(e);
            }
        });
    }
    dropTestDb() {
        return __awaiter(this, void 0, void 0, function* () {
            // Close the testDb connection
            this.sequelize.connectionManager.close();
            // Connect to the regular database so we can drop the test database
            this.sequelize = this.createConnection(this.dbConfig.name);
            // Drop the test database
            yield this.sequelize.query(`drop database ${this.testDbName}`);
        });
    }
    createTables(sq) {
        sq.addModels([DbPortfolio_model_1.DbPortfolio]);
    }
    createConnection(dbName) {
        return new sequelize_typescript_1.Sequelize({
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
exports.SequelizeDb = SequelizeDb;
