import validate from './validate';
import IRoute from '../../helper/route';
import logger from '../../helper/logger';
import Controller from './controller';
export default class Route implements IRoute {
    public async register(server: any): Promise<any> {
        return new Promise((resolve) => {
            logger.info('Routes - Start adding Login routes.');
            const controller = new Controller();
            server.route([
                {
                    method: 'POST',
                    path: '/api/addProduct',
                    options: {
                        handler: controller.addProduct,
                        validate: validate.addProduct,
                        auth: false,
                        description: 'Method to Add Products',
                        tags: ['api'],
                    },
                },
                {
                    method: 'POST',
                    path: '/api/listProduct',
                    options: {
                        handler: controller.listProduct,
                        validate: validate.listProduct,
                        auth: false,
                        description: 'Method to List the products',
                        tags: ['api'],
                    },
                }
            ]);
            logger.info('Routes - Finish adding Login routes.');
            resolve({});
        });
    }
}
