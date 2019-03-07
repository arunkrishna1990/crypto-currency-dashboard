"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./src/server");
const SequelizeDb_1 = require("./src/shared/db/SequelizeDb");
const db_migrations_1 = require("./db.migrations");
require('dotenv').config();
const db = new SequelizeDb_1.SequelizeDb();
db_migrations_1.migrate(db.sequelize).then(_ => {
    db.create();
    server_1.startServer();
}).catch(e => {
    console.error(e);
});
