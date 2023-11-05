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
                    path: '/api/mailAuthorization',
                    options: {
                        handler: controller.mailAuthorization,
                        validate: validate.mailAuthorization,
                        auth: false,
                        description: 'Method to check the whether it is valid mail',
                        tags: ['api'],
                    },
                }
            ]);
            logger.info('Routes - Finish adding Login routes.');
            resolve({});
        });
    }
}
