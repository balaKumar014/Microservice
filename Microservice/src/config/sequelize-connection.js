import { Sequelize } from 'sequelize-typescript';
import * as DotEnv from 'dotenv';
DotEnv.config();
const sequelize = new Sequelize({
    database: "ProductCatalog",
    dialect: "mysql",
    replication: {
        read: {
            host: "localhost",
        },
        write: {
            host: "localhost",
        },
    },
    username: "root",
    password: "Mr.Drago@014",
    models: [__dirname + '/../model'],
    logging: false,
});
export default sequelize;