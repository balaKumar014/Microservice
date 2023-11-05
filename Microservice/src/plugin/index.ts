const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
import logger from '../helper/logger';

export default class Plugins {
    public static async swagger(server: any): Promise<Error | any> {
        try {
            logger.info('Plugins - Registering swagger-ui');
            const swaggerOptions = {
                info: {
                    title: 'Backend',
                    version: '1.0',
                },
            };

            await Plugins.register(server, [
                Inert,
                Vision,
                {
                    plugin: HapiSwagger,
                    options: swaggerOptions,
                },
            ]);
        } catch (error: any) {
            logger.info(`Plugins - Ups, something went wrong when registering swagger-ui plugin: ${error}`);
        }
    }


    public static async boomDecorator(server: any): Promise<Error | any> {
        try {
            logger.info('Plugins - Registering Boom Decorator');

            await Plugins.register(server, {
                plugin: require('./boomDecorator'),
            });
        } catch (error: any) {
            logger.info(`Plugins - Ups, something went wrong when registering Boom Decorator plugin: ${error}`);
        }
    }

    public static async registerAll(server: any): Promise<Error | any> {
        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'acceptance') {
            await Plugins.swagger(server);
        }
        await Plugins.boomDecorator(server);
    }

    private static register(server: any, plugin: any): Promise<Error | any> {
        return new Promise(async (resolve, reject) => {
            try {
                await server.register(plugin);
                resolve(true);
            } catch (error: any) {
                logger.error('Error registering plugins', error);
                reject();
            }
        });
    }
}
