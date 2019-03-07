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
const Umzug = require('umzug');
class MigrationMeta {
    constructor(pendingMigrations) {
        this.pendingMigrations = pendingMigrations;
        this.migratedFiles = [];
    }
    getFileNames(migrations) {
        return migrations.map(migration => {
            return migration.file.replace(/\.js$/, '');
        });
    }
    get pendingMigrationFiles() {
        return this.getFileNames(this.pendingMigrations);
    }
    addMigrated(fileName) {
        this.migratedFiles.push(fileName);
    }
    get filesForReverting() {
        return [...this.migratedFiles].reverse();
    }
    hasFilesToBeReverted() {
        return this.migratedFiles.length > 0;
    }
}
exports.migrate = (sequelize) => __awaiter(this, void 0, void 0, function* () {
    const umzug = initUmzug(sequelize);
    const pendingMigrations = yield umzug.pending();
    const migrationInfo = new MigrationMeta(pendingMigrations);
    migratedHandler(umzug, migrationInfo);
    try {
        yield runPendingMigrations(umzug, migrationInfo.pendingMigrationFiles);
    }
    catch (ex) {
        if (migrationInfo.hasFilesToBeReverted()) {
            yield revertMigration(migrationInfo, umzug);
        }
        return Promise.reject('migration failed');
    }
});
const initUmzug = (sequelize) => {
    return new Umzug({
        storage: 'sequelize',
        storageOptions: {
            sequelize: sequelize,
        },
        migrations: {
            params: [
                sequelize.getQueryInterface(),
                sequelize.constructor,
                () => {
                    throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.');
                }
            ],
            path: './src/shared/db/migrations',
            pattern: /\.js$/
        },
        logging: function () {
            console.log.apply(null, arguments);
        },
    });
};
const migratedHandler = (umzug, migrationInfo) => {
    umzug.on('migrated', (name) => {
        migrationInfo.addMigrated(name);
    });
};
const runPendingMigrations = (umzug, pendingMigrationFiles) => __awaiter(this, void 0, void 0, function* () {
    return yield umzug.execute({
        migrations: pendingMigrationFiles,
        method: 'up'
    });
});
const revertMigration = (migrationInfo, umzug) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield umzug.down({ migrations: migrationInfo.filesForReverting });
    }
    catch (ex) {
        console.error('Revert Migration Failed', ex);
    }
});
