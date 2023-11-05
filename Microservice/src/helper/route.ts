const Hapi = require('@hapi/hapi');

interface IRoute {
    register(server: any): Promise<any>;
}

export default IRoute;
