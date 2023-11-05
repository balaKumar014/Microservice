'use strict';
const Hapi = require('@hapi/hapi');
import Plugin from './plugin';
import sequelize from './config/sequelize-connection';
import Authorization from './api/authorization/routes';
import Products from './api/products/routes';
import logger from './helper/logger';
import * as DotEnv from 'dotenv';

const init = async () => {
    try {
        //load env
        DotEnv.config();

        //initialize sequelize

        sequelize.sync().then();

        //initialize hapi server
        const server = Hapi.server({ host: process.env.HOST, port: 8080, routes: { security: true, cors: true, payload: { maxBytes: 5242880 } } });

        //register hapi routes
        await new Authorization().register(server);
        await new Products().register(server);

        //registering plugins
        await Plugin.registerAll(server);
        //start hapi server
        await server.start((error: any) => {if (error) {
                logger.error(error);
                throw error;
            }
        });

        logger.info('Router - Finish adding routes.');
    } catch (error) {
        logger.error(`Server - There was something wrong: ${error}`);
    }
};

process.on('unhandledRejection', (err) => {
    process.exit(1);
});

init();
