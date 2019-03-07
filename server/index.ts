import { startServer } from './src/server'
import { SequelizeDb } from './src/shared/db/SequelizeDb';
import { migrate } from './db.migrations';

require('dotenv').config();


const db = new SequelizeDb();
migrate(db.sequelize).then(_ => {
    db.create();
    startServer()
}).catch(e => {
    console.error(e);
})

