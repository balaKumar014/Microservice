const Hapi = require('@hapi/hapi');
import * as Boom from '@hapi/boom';
import Resolver from './resolver';
import Utils from '../../helper/utils';
import logger from '../../helper/logger';
export default class Controller {
    public resolver: any;
    constructor() {
        this.resolver = new Resolver();
    }

    public addProduct = async (request: any, h: any): Promise<any> => {
        try {
            logger.info(`POST - ${Utils.getUrl(request)}`);
            const data: any = await this.resolver.addProduct(request.headers.authorization, request.payload);
            return h.response(data);
        } catch (error: any) {
            logger.error(error);
            return Boom.badImplementation(error);
        }
    };

    public listProduct = async (request: any, h: any): Promise<any> => {
        try {
            logger.info(`POST - ${Utils.getUrl(request)}`);
            const data: any = await this.resolver.listProduct(request.headers.authorization, request.payload);
            return h.response(data);
        } catch (error: any) {
            logger.error(error);
            return Boom.badImplementation(error);
        }
    };

}